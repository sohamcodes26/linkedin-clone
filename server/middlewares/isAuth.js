import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token)
      return res.status(400).json({ message: "User does not have token" });

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken)
      return res
        .status(400)
        .json({ message: "User does not have valid token" });

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Authentication error" });
  }
};

export default isAuth

// Its only job is to check for the token cookie.

// It verifies the token using your JWT_SECRET. If the token is valid, it decodes it to get the userId.