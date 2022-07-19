import {
  BY_CREATED,
  CREATE_RECIPE,
  DELETE_RECIPE,
  ERROR_MESSAGE,
  FILTER_BY_DIET,
  GET_ALL_FOODS,
  GET_DETAILS,
  GET_DIETS,
  GET_RECIPE_ID,
} from "./actions";

const initialstate = {
  foods: [],
  diets: [],
  food: [],
  detail: [],
};

const rootReducer = (state = initialstate, action) => {
  console.log(action.healthScore);
  switch (action.type) {
    case GET_ALL_FOODS:
      const allRecipes = action.payload;
      let dietFilter =
        action.diets === "All"
          ? allRecipes
          : allRecipes.filter((element) =>
              element.diets.find((e) => e.name === action.diets)
            );
      if (action.healthScore !== undefined) {
        dietFilter =
          action.healthScore === "Asc"
            ? dietFilter.sort(function (a, b) {
                if (a.healthScore > b.healthScore) {
                  return 1;
                }
                if (b.healthScore > a.healthScore) {
                  return -1;
                }
                return 0;
              })
            : dietFilter.sort(function (a, b) {
                if (a.healthScore > b.healthScore) {
                  return -1;
                }
                if (b.healthScore > a.healthScore) {
                  return 1;
                }
                return 0;
              });
      } else {
        dietFilter =
          action.title === "Asc"
            ? dietFilter.sort(function (a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                  return 1;
                }
                if (b.title.toLowerCase() > a.title.toLowerCase()) {
                  return -1;
                }
                return 0;
              })
            : dietFilter.sort(function (a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                  return -1;
                }
                if (b.title.toLowerCase() > a.title.toLowerCase()) {
                  return 1;
                }
                return 0;
              });
      }
      return {
        ...state,
        foods: dietFilter,
      };
    case GET_RECIPE_ID:
      return {
        ...state,
        food: action.payload,
      };
    case DELETE_RECIPE:
      return {
        ...state,
        foods: state.foods.filter(
          (element) => element.id === action.payload.id
        ),
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    case BY_CREATED:
      return {
        ...state,
        foods: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        foods: state.foods.concat(action.payload),
      };
    case FILTER_BY_DIET:
      return {
        ...state,
        food: dietFilter,
      };
    case ERROR_MESSAGE:
      alert(action.payload);
      return {
        ...state,
        food: {},
      };
    default:
      return state;
  }
};

export default rootReducer;
