import express from "express";
import { bookSeats } from "../controllers/booking.controllers.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/bookings", protect, bookSeats);

export default router;
