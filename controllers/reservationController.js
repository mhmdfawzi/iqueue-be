const { log } = require("console");
const Reservation = require("../models/reservation");

async function getAll(search, reqPage, reqLimit) {
  let reservations;
  try {
    reservations = await Reservation.find()
      // .where(x=>x.reserver == "")
      .select("-__v")
      .populate("queue", "-_id -__v")
      .populate("reserver", "-_id -__v -password");
    if (reservations == null) {
      return { success: false, message: "Cannot find reservations" };
    }
  } catch (err) {
    return {
      success: false,
      message: "Reservations not found",
      error: err.message,
    };
  }

  return {
    success: true,
    data: reservations,
  };
}

async function getById(id) {
  let reservation;
  try {
    reservation = await Reservation.findById(id)
      .select("-__v")
      .populate("serviceProvider", "-_id -__v")
      .populate("queue", "-_id -__v")
      .populate("reserver", "-_id -__v -password");
    if (reservation == null) {
      return { success: false, message: "Cannot find reservation" };
    }
  } catch (err) {
    return {
      success: false,
      message: "Reservations not found",
      error: err.message,
    };
  }

  return {
    success: true,
    data: reservation,
  };
}

async function add(body) {
  const reservation = new Reservation(body);

  try {
    const newReservation = await reservation.save();
    return {
      success: true,
      data: newReservation,
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to add reservation",
      error: err.message,
    };
  }
}

async function update(
  id,
  manager = null,
  bookCount = null,
  nowServing = null,
  nextServing = null,
  name = null
) {
  let reservation;
  try {
    reservation = await Reservation.findById(id);
    if (reservation == null) {
      return { success: false, message: "Cannot find reservation" };
    }
    if (name != null) {
      reservation.name = name;
    }
    if (manager != null) {
      reservation.manager = manager;
    }
    if (bookCount != null) {
      reservation.bookCount = bookCount;
    }
    if (nowServing != null) {
      reservation.nowServing = nowServing;
    }
    if (nextServing != null) {
      reservation.nextServing = nextServing;
    }

    const updatedReservation = await reservation.save();
    return {
      success: true,
      data: updatedReservation,
      message: "Reservation updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to update reservation",
      error: err.message,
    };
  }
}

async function remove(id) {
  let reservation;
  try {
    reservation = await Reservation.findById(id);
    if (reservation == null) {
      return { success: false, message: "Cannot find reservation" };
    }

    await reservation.remove();
    return {
      success: true,
      message: "Deleted reservation",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to delete reservation",
      error: err.message,
    };
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
