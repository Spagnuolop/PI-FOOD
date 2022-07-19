import axios from "axios";

export const GET_ALL_FOODS = "GET_ALL_FOODS";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const GET_RECIPE_ID = "GET_RECIPE_ID";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_DIETS = "GET_DIETS";
export const BY_CREATED = "BY_CREATED";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DETAILS = "GET_DETAILS";
export const ORDER_BY_PUNTUATION = "ORDER_BY_PUNTUATION";
export const FILTER_BY_CREATED_RECIPE = "FILTER_BY_CREATED_RECIPE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const DELETE_RECIPE = "DELETE_RECIPE";

export const getAllFoods = (diets, title, healthScore) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/recipes");
    dispatch({
      diets: diets,
      title: title,
      healthScore: healthScore,
      type: GET_ALL_FOODS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error,
    });
  }
};

export const getRecipeId = (id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/recipes/" + id);
    dispatch({
      type: GET_RECIPE_ID,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error,
    });
  }
};

/* export const getRecipeName = (title) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3001/recipes?name=${title}`);
    dispatch({
      type: GET_RECIPE_NAME,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error,
    });
  }
}; */

export const getDiets = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/diets/");
    dispatch({
      type: GET_DIETS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error,
    });
  }
};

export const byCreated = (payload) => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:3001/recipes/recipe/created/" + payload
    );
    dispatch({
      type: BY_CREATED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error,
    });
  }
};

export const searchRecipe = (title) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/recipes/" + title);
    dispatch({
      type: SEARCH_RECIPE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error,
    });
  }
};

export const resetRecipe = () => async (dispatch) => {
  dispatch({
    type: SEARCH_RECIPE,
    payload: {},
  });
};

export const newRecipe = (recipe) => async () => {
  await axios.post("http://localhost:3001/recipes", recipe);
};

export const getDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/recipes/" + id);
    dispatch({
      type: GET_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error,
    });
  }
};

export function filterRecipesByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export const deleteRecipe = (payload) => async (dispatch) => {
  try {
    const response = await axios.delete(
      "http://localhost:3001/recipes/" + payload
    );
    dispatch({
      type: DELETE_RECIPE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error,
    });
  }
};
