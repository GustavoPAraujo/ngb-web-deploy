import jwt from 'jsonwebtoken';


export const generateUserToken = (user_ID, res) => {
    const token = jwt.sign({user_ID}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
    // Sending as a Cookie
    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, // 15 days in mili seconds
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV !== "development",
        partitioned: true,
        domain: ".onrender.com"
    });
}
