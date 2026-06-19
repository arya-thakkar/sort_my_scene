import mongoose from "mongoose";
import Seat from "../models/seat.models.js";
import Reservation from "../models/reservation.models.js";

export const bookSeats = async (req, res) => {
  const { eventId, seatNumbers } = req.body;
  const userId = req.user._id;

  if (!eventId || !Array.isArray(seatNumbers) || seatNumbers.length === 0) {
    return res.status(400).json({
      success: false,
      message: "eventId and a non-empty seatNumbers array are required.",
    });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const reservation = await Reservation.findOne({
      userId,
      eventId,
      expiresAt: { $gt: new Date() },
    }).session(session);

    if (!reservation) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "No valid reservation found. It may have expired or does not exist.",
      });
    }

    const reservedSeats = await Seat.find({
      _id: { $in: reservation.seatIds },
    }).session(session);

    const reservedNumbers = reservedSeats.map((s) => s.seatNumber);
    const notReserved = seatNumbers.filter((n) => !reservedNumbers.includes(n));

    if (notReserved.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: `Seat(s) not part of your reservation: ${notReserved.join(", ")}`,
      });
    }

    await Seat.updateMany(
      { _id: { $in: reservation.seatIds } },
      { $set: { status: "booked" } },
      { session }
    );

    await Reservation.findByIdAndDelete(reservation._id, { session });

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Booking confirmed!",
      booking: {
        userId,
        eventId,
        seatNumbers,
        bookedAt: new Date(),
      },
    });
  } catch (error) {
    await session.abortTransaction();
    if (error.errorLabels?.includes("TransientTransactionError")) {
      return res.status(409).json({
        success: false,
        message: "Booking conflict — please try again.",
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    session.endSession();
  }
};
