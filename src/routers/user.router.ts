import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();

router.get("/", UserController.getAll);

router.get("/:id", UserController.get);

router.post("/", UserController.add);

router.put("/:id", UserController.edit);

export default router;
