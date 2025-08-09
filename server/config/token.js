import jwt from "jsonwebtoken";

const generateToken = async (userId) => {
  try {
    let token = await jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;
