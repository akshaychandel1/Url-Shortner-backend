import { Router } from "express";

import { sendContactMail } from "../controllers/contact.controller"

const router = Router();

router.post("/send", sendContactMail);

export default router