import { Router } from "express";
import { login, registerUser } from "../controllers/authController";
import { authenticateToken } from "../middleware/authenticationMiddleware";
const router = Router();

router.post('/register', authenticateToken, registerUser);
router.post('/login', login);

export default router;