const express = require("express");
const router = express.Router();
let {
  getAll,
  getById,
  add,
  update,
  remove,
} = require("../controllers/serviceProviderController");

/**
 * @swagger
 * /api/serviceProviders:
 *   get:
 *     description: All service providers
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
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The service provider ID.
 *     description: Get a service provider by id
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
 *     parameters:
 *      - in: body
 *        name: service provider
 *        description: New service provider
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
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  let body = {
    name: req.body.name,
    ownerId: req.body.ownerId,
    categoryId: req.body.categoryId,
    long: req.body.long,
    lat: req.body.lat,
    createdBy: req.body.createdBy,
    address: req.body.address,
    phone: req.body.phone,
  };
  let response = await add(body);

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/serviceProviders/{id}:
 *   put:
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
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The service provider ID.
 *     description: Delete a service provider by id
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
