export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: "Invalid email address format"
        };
    }
    return {isValid: true};
};

export const validateUsername = (username) => {
    if (username.length < 4) {
        return {
            isValid: false,
            message: "Username must have at least 4 characters"
        };
    }
    const usernameRegex = /^[a-zA-Z0-9]*$/;
    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must not contain special characters"
        };
    }
    return {isValid: true};
};

export const validatePassword = (password) => {
    if (password.length < 6) {
        return {
            isValid: false,
            message: "Password must have at least 6 characters"
        };
    }
    return {isValid: true};
};
