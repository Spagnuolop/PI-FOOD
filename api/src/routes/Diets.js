const { Router } = require("express");
const axios = require("axios");
const { Recipe, Diet } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const result = await Diet.findAll({
    include: Recipe,
  });
  result ? res.status(200).json(result) : res.status(404);
});

module.exports = router;
