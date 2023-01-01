const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let {
  getAll,
  getById,
  add,
  update,
  remove,
} = require("../controllers/queueController");

/**
 * @swagger
 * /api/queues/{serviceProviderID}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: serviceProviderID
 *        required: true
 *        type: string
 *        description: The service provider ID. 
 *     description: All queues
 *     tags:
 *      - Queues
 *     responses:
 *       200:
 *         description: Returns all the queues
 */
router.get("/:serviceProviderID", async (req, res) => {
  let response = await getAll(req.params.serviceProviderID);

  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/queues/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The queue ID.
 *     description: Get a queue by id
 *     tags:
 *      - Queues
 *     responses:
 *       200:
 *         description: Returns the requested queue
 */
router.get("/:id", async (req, res) => {
  let response = await getById(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /api/queues:
 *   post:
 *     parameters:
 *      - in: body
 *        name: queue
 *        description: New queue
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            serviceProvider:
 *              type: string
 *            manager:
 *              type: string
 *            createdBy:
 *              type: string
 *     tags:
 *      - Queues
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  try {
    let body = {
      name: req.body.name,
      serviceProvider: mongoose.Types.ObjectId(req.body.serviceProvider),
      manager: mongoose.Types.ObjectId(req.body.manager),
      createdBy: req.body.createdBy,
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
 * /api/queues/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The queue ID.
 *      - in: body
 *        name: queue
 *        description: Update queue
 *        schema:
 *          type: object
 *          properties:
 *            manager:
 *              type: string
 *            bookCount:
 *              type: number
 *            nowServing:
 *              type: number
 *            nextServing:
 *              type: number
 *            name:
 *              type: string
 *     tags:
 *      - Queues
 *     responses:
 *       201:
 *         description: Created
 */
router.put("/:id", async (req, res) => {
  let name,
    manager,
    bookCount,
    nextServing,
    nowServing = null;
  if (req.body.name) {
    name = req.body.name;
  }
  if (req.body.manager) {
    manager = req.body.manager;
  }
  if (req.body.bookCount) {
    bookCount = req.body.bookCount;
  }
  if (req.body.nextServing) {
    nextServing = req.body.nextServing;
  }
  if (req.body.nowServing) {
    nowServing = req.body.nowServing;
  }
  let response = await update(
    req.params.id,
    manager,
    bookCount,
    nowServing,
    nextServing
  );

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/queues/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The queue ID.
 *     description: Delete a queue by id
 *     tags:
 *      - Queues
 *     responses:
 *       200:
 *         description: Returns the requested queue
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
