const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header

        if (!token) return res.sendStatus(401);

        // Verify the token
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.sendStatus(500); // Internal Server Error
    }
}

module.exports = authenticateToken;
