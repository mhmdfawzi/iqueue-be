const express = require("express");
const router = express.Router();
let {
  getAll,
  getById,
  add,
  update,
  remove,
} = require("../controllers/spCategoryController");

/**
 * @swagger
 * /api/spCategories:
 *   get:
 *     summary: Get all service provider categories
 *     description: All sp categories
 *     tags:
 *      - Categories
 *     responses:
 *       200:
 *         description: Returns all the sp categories
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
 * /api/spCategories/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The sp category ID.
 *     description: Get a sp category by id
 *     summary: Get a category by ID
 *     tags:
 *      - Categories
 *     responses:
 *       200:
 *         description: Returns the requested sp category
 */
router.get("/:id", async (req, res) => {
  let response = await getById(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /api/spCategories:
 *   post:
 *     summary: Add new service category
 *     parameters:
 *      - in: body
 *        name: sp category
 *        description: New sp category
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *     tags:
 *      - Categories
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  let body = {
    name: req.body.name
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
 * /api/spCategories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The sp category ID.
 *      - in: body
 *        name: sp category
 *        description: Update sp category
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *     tags:
 *      - Categories
 *     responses:
 *       201:
 *         description: Created
 */
router.put("/:id", async (req, res) => {
  let name=null;
  if (req.body.name) {
    name = req.body.name;
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
 * /api/spCategories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The sp category ID.
 *     description: Delete a sp category by id
 *     tags:
 *      - Categories
 *     responses:
 *       200:
 *         description: Returns the requested sp category
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
