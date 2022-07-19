const { Router } = require("express");
const recipes = require("./Recipes.js");
const diets = require("./Diets");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/recipes", recipes);
router.use("/diets", diets);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
