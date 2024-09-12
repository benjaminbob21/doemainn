import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware function to handle some request.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */

const handleValidationErrors = async (req: Request, res:Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateMyUserRequest = [
  check("firstName", "First Name is required").isString().notEmpty(),
  check("lastName", "Last Name is required").isString().notEmpty(),
  check("email", "Email is required").isString().isEmail().notEmpty(),
  check("password", "Password must have 6 or more characters")
    .notEmpty()
    .isLength({ min: 6 }),
  handleValidationErrors,
];

const loginCorrect = [
  check("email", "Email is required").isEmail(),
  check("password", "Password must have 6 or more characters")
    .notEmpty()
    .isLength({
      min: 6,
    }),
  handleValidationErrors,
];

export { validateMyUserRequest, loginCorrect };
