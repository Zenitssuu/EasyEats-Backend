import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 500,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 100,
  message: "Too many login/signup attempts. Try again later.",
});
