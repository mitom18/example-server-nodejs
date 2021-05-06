import { Router } from "express";
import { SessionController } from "../controllers";

const router = Router();

router.post("/", SessionController.add);

router.get("/current", SessionController.getCurrent);

export default router;
