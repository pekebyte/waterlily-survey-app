import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User } from '../models';

const router = express.Router();

const signupValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').isString().notEmpty().withMessage('Name is required')
];

router.post('/signup', signupValidation, async (req: any, res: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, name } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }
        const newUser = await User.create({ email, password, name, role: 'user' });
        // Generate JWT
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '2d' }
        );
        res.status(201).json({ message: "Signup successful", token, user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } });
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Signup failed.' });
    }
});

export default router;