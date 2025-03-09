import { Router } from "express";
import { changePassword, login, registerUser, resetPassword } from "../controllers/authController";
import { authenticateToken } from "../middleware/authenticationMiddleware";
const router = Router();

router.post('/login', login);
router.post('/resetPassword', resetPassword);
router.post('/changePassword', authenticateToken, changePassword);
router.post('/register', authenticateToken, registerUser);

export default router;