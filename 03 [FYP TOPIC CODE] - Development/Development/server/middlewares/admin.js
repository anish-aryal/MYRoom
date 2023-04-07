import jwt from "jsonwebtoken";
import * as config from "../config.js";

export const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    console.log(decoded)
    if (!decoded || !decoded.role || !decoded.role.includes("Admin")) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  
};
