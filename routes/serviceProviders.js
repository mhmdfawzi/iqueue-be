const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let {
  getAll,
  getById,
  add,
  update,
  remove,
} = require("../controllers/serviceProviderController");

/**
 * @swagger
 * tags:
 *  - name: Auth
 *  - name: Categories
 *  - name: Service Providers
 *  - name: Queues
 *  - name: Reservations
 * /api/serviceProviders:
 *   get:
 *     summary: Get all the service providers in system
 *     description: All service providers
 *     tags:
 *      - Service Providers
 *     responses:
 *       200:
 *         description: Returns all the service providers
 */
router.get("/", async (req, res) => {
  let response = await getAll(req.query.s, req.query.page, req.query.limit);

  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/serviceProviders/{id}:
 *   get:
 *     summary: Get specific service provider by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The service provider ID.
 *     description: Get a service provider by id
 *     tags:
 *      - Service Providers
 *     responses:
 *       200:
 *         description: Returns the requested service provider
 */
router.get("/:id", async (req, res) => {
  let response = await getById(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /api/serviceProviders:
 *   post:
 *     summary: Add new service provider
 *     parameters:
 *      - in: body
 *        name: service provider 
 *        description: New service provider
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            owner:
 *              type: string
 *            category:
 *              type: string
 *            long:
 *              type: number
 *            lat:
 *              type: number
 *            createdBy:
 *              type: string
 *            address:
 *              type: string
 *            phone:
 *              type: string
 *     tags:
 *      - Service Providers
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  try {
    let body = {
      name: req.body.name,
      owner: mongoose.Types.ObjectId(req.body.owner),
      category: mongoose.Types.ObjectId(req.body.category),
      long: req.body.long,
      lat: req.body.lat,
      createdBy: mongoose.Types.ObjectId(req.body.createdBy),
      address: req.body.address,
      phone: req.body.phone,
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
 * /api/serviceProviders/{id}:
 *   put:
 *     summary: Update service provider information
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The service provider ID.
 *      - in: body
 *        name: service provider
 *        description: Update service provider
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            ownerId:
 *              type: string
 *            categoryId:
 *              type: string
 *            long:
 *              type: number
 *            lat:
 *              type: number
 *            createdBy:
 *              type: string
 *            address:
 *              type: string
 *            phone:
 *              type: string
 *     tags:
 *      - Service Providers
 *     responses:
 *       201:
 *         description: Created
 */
router.put("/:id", async (req, res) => {
  let name,
    phone,
    long,
    lat = null;
  if (req.body.name) {
    name = req.body.name;
  }
  if (req.body.phone) {
    phone = req.body.phone;
  }
  if (req.body.long) {
    long = req.body.long;
  }
  if (req.body.lat) {
    lat = req.body.lat;
  }
  let response = await update(req.params.id, name, phone, long, lat);

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/serviceProviders/{id}:
 *   delete:
 *     summary: Delete service provider by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The service provider ID.
 *     description: Delete a service provider by id
 *     tags:
 *      - Service Providers
 *     responses:
 *       200:
 *         description: Returns the requested service provider
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
