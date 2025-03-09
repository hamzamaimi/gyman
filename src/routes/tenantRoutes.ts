import { Router } from "express";
import { getBase64Logo } from "../controllers/tenantController";

const router = Router();

router.get('/base64logo', getBase64Logo);

export default router;
