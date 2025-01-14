import crypto from "crypto";

export const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex"); // Generate a random token
  const resetTokenExpiry = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now (epoch time in seconds)
  return { resetToken, resetTokenExpiry };
};
