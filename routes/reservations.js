const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let {
  getAll,
  getById,
  add,
  remove,
} = require("../controllers/reservationController");

/**
 * @swagger
 * /api/reservations/queue/{queueID}:
 *   get:
 *     summary: Get all reservations for specific queue by the queue ID
 *     parameters:
 *      - in: path
 *        name: queueID
 *        required: true
 *        type: string
 *        description: The queue ID.
 *     description: All reservations
 *     tags:
 *      - Reservations
 *     responses:
 *       200:
 *         description: Returns all the reservations
 */
router.get("/queue/:queueID", async (req, res) => {
  console.log("=== all === ")
  let response = await getAll(req.params.queueID);

  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Get specific reservation by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The reservation ID.
 *     description: Get a reservation by id
 *     tags:
 *      - Reservations
 *     responses:
 *       200:
 *         description: Returns the requested reservation
 */
router.get("/:id", async (req, res) => {

  let response = await getById(req.params.id);
  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a reservation in a Queue
 *     parameters:
 *      - in: body
 *        name: reservation
 *        description: New reservation
 *        schema:
 *          type: object
 *          properties:
 *            reserver:
 *              type: string
 *            queue:
 *              type: string
 *     tags:
 *      - Reservations
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  try {
    let body = {
      reserver: req.body.reserver,
      queue: req.body.queue,
    };
    let response = await add(body);

    if (response.success == true) {
      res.status(201).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Cancel a reservation
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The reservation ID.
 *     description: Delete a reservation by id
 *     tags:
 *      - Reservations
 *     responses:
 *       200:
 *         description: Returns the requested reservation
 */
router.delete("/:id", async (req, res) => {
  let response = await remove(req.params.id);
  try {
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(response);
  }
});

module.exports = router;
