import { Router } from "express";
import { login, registerUser } from "../controllers/authController";
const router = Router();

router.post('/register', (req, res) => registerUser);

router.post('/login', (req, res) => login)

export default router;