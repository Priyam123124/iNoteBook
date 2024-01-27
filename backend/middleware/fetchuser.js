const jwt = require("jsonwebtoken");
const JWT_SECRET = "PriyamIsAGoodB0$y"

const fetchuser = (req, res, next) => {

    //Get the user from the jwt token and add id to req obj
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        // If verification is successful, extract the user information from the token and add it to the 'req' object
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;