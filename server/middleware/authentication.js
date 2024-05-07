import jwt from 'jsonwebtoken'
const SECRET = "sdfjskddfs"
export const generatejwt = (user) => {
    const payload = { username: user.username };
    return jwt.sign(payload, SECRET, { expiresIn: "24h" });
}
export function userauthentication(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
                req.user = user;
                next();
            }
        })
    }
    else {
        return res.status(402).send("user does not exist")
    }
}
export const adminauthentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
                req.user = user;
                next();
            }
        })
    }
    else {
        return res.status(402).send("user does not exist")
    }
}
export const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "there is some error" });
            }
            else {
                req.user = user;
                next();
            }
        })
    }
    else {
        res.status(404).json({ message: "invalid user", status: false })
    }
}