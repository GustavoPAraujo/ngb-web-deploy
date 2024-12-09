// Importações necessárias
import User from "../models/user.js";
import Notification from "../models/notification.js";
import bcrypt from "bcryptjs";
import { validateEmail, validateUsername, validatePassword } from "../lib/utils/fieldValidators.js";
import { v2 as cloudinary } from "cloudinary";

// Função auxiliar para excluir imagem antiga do Cloudinary
// Recebe a URL completa da imagem e extrai o public_id antes de chamar o destroy.
const deleteCloudinaryImage = async (imageUrl) => {
    if (!imageUrl) return;
    try {
        // Exemplo de URL do Cloudinary:
        // https://res.cloudinary.com/seu_cloud_name/image/upload/v1234567890/pasta/nome_da_imagem.png
        // O public_id é a parte após ".../upload/" e antes da extensão. Ex: "pasta/nome_da_imagem"
        const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0]; 
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(`Erro ao deletar imagem do Cloudinary: ${error.message}`);
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const username = req.params.username;
        const searched_user = await User.findOne({username}).select("-password");
        if (!searched_user) {
            return res.status(404).json({message: "User not found"});
        }
        // Checking following status
        const searched_user_id = searched_user._id.toString();
        let is_follower = req.user.followers.includes(searched_user_id);
        let is_following = req.user.following.includes(searched_user_id);
        res.status(200).json({
            user: searched_user,
            is_follower: is_follower,
            is_following: is_following
        });
    } catch (error) {
        console.log(`Error in getUserProfile controller: "${error.message}"`);
        res.status(500).json({error: `Internal Server Error: "${error.message}"`});
    }
};

export const getSuggestedProfiles = async (req, res) => {
    try {
        const ignored_users = req.user.following;
        ignored_users.push(req.user._id);
        
        const suggested_users = await User.aggregate([
            {
                $sample: {size: 5}
            },            
            {
                $match: {
                    _id: {$nin: ignored_users}
                }
            }
        ]);
        
        suggested_users.forEach(user => user.password=null);
        res.status(200).json(suggested_users);
    } catch (error) {
        console.log(`Error in getSuggestedProfiles controller: "${error.message}"`);
        res.status(500).json({error: `Internal Server Error: "${error.message}"`});
    }
};

export const toggleFollowUser = async (req, res) => {
    const { username } = req.params;
    try {
        const target_id = req.params.user_id;
        if (target_id == req.user._id) {
            return res.status(400).json({ error: "Can't follow/unfollow yourself"});
        }
        // Finding Users
        const target_user = await User.findById(target_id).select("-password");
        const user = await User.findById(req.user._id).select("-password");
        if (!target_user) {
            return res.status(400).json({ error: "User not found" });
        }
        // Logic to toggle following
        let message;
        let following;
        if (user.following.includes(target_id)) {
            // Unfollow
            await User.findByIdAndUpdate(target_id, { $pull: { followers: user.id}});
            await User.findByIdAndUpdate(user.id, { $pull: { following: target_id}});
            message = `User "${target_user.username}" unfollowed successfully`;
            following = false;
        } else {
            // Follow
            await User.findByIdAndUpdate(target_id, { $push: { followers: user.id}});
            await User.findByIdAndUpdate(user.id, { $push: { following: target_id}});
            // Creating follow notification
            const notification = new Notification({
                type: "follow",
                from: user.id,
                to: target_id
            });
            await notification.save();
            user.password = null;
            message = `User "${target_user.username}" followed successfully`;
            following = true;
        }
        res.status(200).json({user_id: target_id, message: message, following: following});
    } catch (error) {
        console.log(`Error in toggleFollowUser controller: "${error.message}"`);
        res.status(500).json({error: `Internal Server Error: "${error.message}"`});
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { 
            full_name, 
            email, 
            username, 
            current_password, 
            new_password, 
            bio, 
            profile_img, 
            cover_img 
        } = req.body;

        // Validação de senhas
        if ((new_password && !current_password) || (!new_password && current_password)) {
            return res.status(400).json({ error: "Please provide both current password and new password" });
        }

        if (current_password && new_password) {
            const new_password_validation = validatePassword(new_password); 
            if (!new_password_validation.isValid) {
                return res.status(400).json({ error: new_password_validation.message });
            }
            const valid_current_password = await bcrypt.compare(current_password, user.password);
            if (!valid_current_password) {
                return res.status(400).json({ error: "Current password incorrect" });
            }
            const salt = await bcrypt.genSaltSync(10);
            user.password = await bcrypt.hash(new_password, salt);
        }

        // Validação de email
        if (email !== undefined && (email != user.email)) {
            const email_validation = validateEmail(email); 
            if (!email_validation.isValid) {
                return res.status(400).json({ error: email_validation.message });
            }
            const existing_email = await User.findOne({ email: email });
            if (existing_email) {
                return res.status(400).json({ error: "Email is already in use" });
            }
            user.email = email;
        }

        // Validação de username
        if (username !== undefined && (username != user.username)) {
            const username_validation = validateUsername(username);
            if (!username_validation.isValid) {
                return res.status(400).json({ error: username_validation.message });
            }
            const existing_user = await User.findOne({ username: username });
            if (existing_user) {
                return res.status(400).json({ error: "Username is already in use" });
            }
            user.username = username;
        }
        
        // Upload de imagens (profile_img e cover_img) usando Cloudinary
        // Se o usuário passar novos links base64 (por exemplo), faremos upload
        // Antes, deletamos a imagem antiga se ela existir
        if (profile_img) {
            // Deleta a imagem anterior no Cloudinary se existir
            if (user.profile_img) await deleteCloudinaryImage(user.profile_img);

            // Faz upload da nova imagem
            const uploadedProfile = await cloudinary.uploader.upload(profile_img);
            user.profile_img = uploadedProfile.secure_url;
        }

        if (cover_img) {
            // Deleta a imagem anterior no Cloudinary se existir
            if (user.cover_img) await deleteCloudinaryImage(user.cover_img);

            // Faz upload da nova imagem
            const uploadedCover = await cloudinary.uploader.upload(cover_img);
            user.cover_img = uploadedCover.secure_url;
        }

        // Atualizando outros campos
        user.full_name = full_name ?? user.full_name;
        user.bio = bio ?? user.bio;

        // Salvando e removendo password do retorno
        user = await user.save();
        user.password = null;

        return res.status(200).json({ message: "User updated successfully", user: user});
    } catch (error) {
        console.log(`Error in updateUserProfile controller: "${error.message}"`);
        res.status(500).json({error: `Internal Server Error: "${error.message}"`});
    } 
};

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query; // Captura o termo de busca

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Busca usuários cujo nome de usuário ou nome completo corresponda ao termo
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { full_name: { $regex: query, $options: "i" } }
            ]
        }).select("username full_name profile_img");

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.log(`Error in searchUsers controller: "${error.message}"`);
        res.status(500).json({ error: `Internal Server Error: "${error.message}"` });
    }
};

