const express = require("express");
const router = express.Router();

let { register, login } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "18347a325e7b767719fcb28574db935d064bc9f2fcff42c7d31143c94c67bb571d1cfd";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     parameters:
 *      - in: body
 *        name: user
 *        description: New user
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/register", async (req, res) => {
  let body = {
    username: req.body.username,
    password: req.body.password,
  };

  let response = await register(body);
  console.log("response => ", response);
  if (response.success == true) {
    serCookies(
      response.data._id,
      response.data.username,
      response.data.role,
      res
    );
    res.status(201).json(response);
  } else {
    res.status(400).json(response);
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     parameters:
 *      - in: body
 *        name: user
 *        description: New user
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Username or Password not present",
    });
  }
  let body = {
    username: req.body.username,
    password: req.body.password,
  };

  let response = await login(body);

  if (response.success == true) {
    serCookies(
      response.data._id,
      response.data.username,
      response.data.role,
      res
    );
    res.status(200).json(response);
  } else {
    res.status(401).json(response);
  }
});

module.exports = router;

function serCookies(id, username, role, res) {
  const maxAge = 3 * 60 * 60;
  const token = jwt.sign(
    {
      id: id,
      username: username,
      role: role,
    },
    jwtSecret,
    {
      expiresIn: maxAge, // 3hrs in sec
    }
  );
  res.cookie("iqueue-jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: maxAge * 1000, // 3hrs in ms
  });
}
