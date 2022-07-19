const axios = require("axios");
const { Recipe, Diet } = require("./db");
const { API_KEY } = process.env;
require("dotenv").config();

const InitDB = async () => {
  try {
    const result = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    let diets = [];
    if (result) {
      result.data.results.map(async (element) => {
        element.diets.map(async (d) => {
          let hit = diets.filter((x) => x.name === d);
          if (!hit[0]) {
            diets.push({ name: d });
          }
        });
      });
      await Diet.bulkCreate(diets);
    }
    diets = await Diet.findAll();
    let result3 = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    result3.data.results.map(async (r) => {
      const apiRecipes = await Recipe.create({
        title: r.title,
        summary: r.summary,
        healthScore: r.healthScore,
        image: r.image,
        steps: r.analyzedInstructions[0]?.steps.map((ele) => {
          return ele.step;
        }),
      });
      /* console.log(r.analyzedInstructions[0]?.steps[0]); */
      r.diets.map(async (t) => {
        let data = diets.filter((n) => n.name === t);
        await apiRecipes.addDiets(data[0].dataValues.id);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { InitDB };
