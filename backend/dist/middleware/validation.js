"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCorrect = exports.validateMyUserRequest = void 0;
const express_validator_1 = require("express-validator");
/**
 * Middleware function to handle some request.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
const handleValidationErrors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});
const validateMyUserRequest = [
    (0, express_validator_1.check)("firstName", "First Name is required").isString().notEmpty(),
    (0, express_validator_1.check)("lastName", "Last Name is required").isString().notEmpty(),
    (0, express_validator_1.check)("email", "Email is required").isString().isEmail().notEmpty(),
    (0, express_validator_1.check)("password", "Password must have 6 or more characters")
        .notEmpty()
        .isLength({ min: 6 }),
    handleValidationErrors,
];
exports.validateMyUserRequest = validateMyUserRequest;
const loginCorrect = [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password must have 6 or more characters")
        .notEmpty()
        .isLength({
        min: 6,
    }),
    handleValidationErrors,
];
exports.loginCorrect = loginCorrect;
