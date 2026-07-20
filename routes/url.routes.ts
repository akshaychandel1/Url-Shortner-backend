import { Router } from "express";
import { createUrl, redirect, myUrls } from "../controllers/url.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, createUrl);

router.get("/my-urls", authMiddleware, myUrls);

router.get("/:shortCode", redirect);

export default router;