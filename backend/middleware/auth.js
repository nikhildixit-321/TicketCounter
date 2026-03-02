const { validateToken } = require("../services/authincation")

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            // Optionally log or handle token errors here
        }

        return next(); // ✅ Always call next at the end
    };
}

module.exports = {
    checkForAuthenticationCookie,
}