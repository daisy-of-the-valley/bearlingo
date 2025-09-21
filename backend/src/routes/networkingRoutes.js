import express from "express";
import * as networkingController from "../controllers/networkingController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ---------- LinkedIn Profile Routes ----------
router.post("/linkedin-profile", authenticate, networkingController.createLinkedInProfile);
router.put("/linkedin-profile", authenticate, networkingController.updateLinkedInProfile);

// ---------- Events Routes ----------
router.post("/events", authenticate, networkingController.createEventsToAttend);
router.put("/events", authenticate, networkingController.updateEventsToAttend);

// ---------- Reflection Routes ----------
router.post("/reflection", authenticate, networkingController.createReflection);

// ---------- LinkedIn Post Routes ----------
router.post("/linkedin-post", authenticate, networkingController.createLinkedInPost);
router.put("/linkedin-post", authenticate, networkingController.updateLinkedInPost);
// http://localhost:8080/api/users/me/networking/events
export default router;