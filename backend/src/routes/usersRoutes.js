import express from "express";

//controllers
import * as usersController from "../controllers/usersController.js";

//middlewares
import { authenticate } from "../middlewares/authMiddleware.js";
import { validateRegisterInputs, validateProfileUpdateInputs, handleValidationErrors } from "../middlewares/inputValidators.js";

const router = express.Router();

// ---------- Auth Routes ----------
router.post("/register", validateRegisterInputs, handleValidationErrors, usersController.registerUser);
router.post("/login", usersController.loginUser);
router.post("/logout", usersController.logoutUser);

// ---------- Profile Routes ----------
router.put("/profile", authenticate, validateProfileUpdateInputs, handleValidationErrors, usersController.updateUserProfile);

// ---------- User Management Routes ----------
router.get("/add", usersController.addUser);
router.get("/", authenticate, usersController.getUserInfo);
router.delete("/", authenticate, usersController.deleteUser);
router.get("/", authenticate, usersController.getAllUsers);

// ---------- Progress & Tracking Routes ----------
router.get("/completed-levels", authenticate, usersController.getCompletedLevels);
router.get("/streaks", authenticate, usersController.getStreak);
router.get("/progress/module/:moduleId", authenticate, usersController.getUserModuleProgress);
router.get("/modules", authenticate, usersController.getModules);
router.get("/modules/:moduleId", authenticate, usersController.getModuleById);
router.get("/modules/level-subtasks/:subtaskId", authenticate, usersController.getSubtaskById);
router.get("/complete/level-subtasks/:subtaskId", authenticate, usersController.completeSubtask);


// ---------- Journal Routes ----------
router.post("/journals", authenticate, usersController.createJournalEntry);
router.get("/journals/:id", authenticate, usersController.getJournalEntry);
router.delete("/journals/:id", authenticate, usersController.deleteJournalEntry);
router.get("/journals", authenticate, usersController.getAllJournalEntries);
router.get("/journals/:year/:month", authenticate, usersController.getJournalsByMonth);
router.put("/journals/:id", authenticate, usersController.updateJournalEntry);

// ---------- Leaderboard Routes ----------
router.get("/leaderboard", authenticate, usersController.getLeaderboard);

export default router;
