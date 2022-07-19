const { Router } = require("express");
const { Recipe, Diet } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const result = await Recipe.findAll({
    include: Diet,
  });
  result ? res.status(200).json(result) : res.status(404);
});

router.get("/recipes/:title", async (req, res) => {
  const { title } = req.params;
  const result = await Recipe.findOne({
    where: { title: title },
    include: Diet,
  });
  result
    ? res.status(200).json(result)
    : res.status(404).send("Recipe not found");
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Recipe.findByPk(id, {
    include: Diet,
  });
  result
    ? res.status(200).send(result)
    : res.status(404).send("Recipe not found");
});

router.post("/", async (req, res) => {
  const { title, summary, healthScore, image, steps, diets } = req.body;
  const result = await Recipe.create({
    title: title.toLowerCase(),
    summary,
    healthScore,
    image,
    steps,
    createdInDb: true,
  });
  diets.map((typ) => {
    result.setDiets(typ);
  });
  result
    ? res.status(200).send(result)
    : res.status(404).send("Create recipe error");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await Recipe.destroy({
    where: { id: id },
  });
  result ? res.status(200).json(result) : res.status(404).send("Id not found");
});

module.exports = router;
