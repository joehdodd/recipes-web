import API from "../../API";

function fetchingRecipes(bool) {
  return {
    type: "FETCHING_RECIPES",
    fetching: bool
  };
}

function fetchingRecipe(bool) {
  return {
    type: "FETCHING_RECIPE",
    fetching: bool
  };
}

function setRecipes(recipes) {
  return {
    type: "SET_RECIPES",
    recipes
  };
}

function setRecipe(recipe) {
  return {
    type: "SET_RECIPE",
    recipe
  };
}

function fetchRecipesSuccess(recipes) {
  return dispatch => {
    dispatch(fetchingRecipes(false));
    dispatch(setRecipes(recipes));
  };
}

function fetchRecipeSuccess(recipe) {
  return dispatch => {
    dispatch(fetchingRecipe(false));
    dispatch(setRecipe(recipe));
  };
}

function fetchRecipesError(error) {
  return dispatch => {
    dispatch(fetchingRecipes(false));
    return {
      type: "FETCHING_RECIPES_ERROR",
      error
    };
  };
}

function fetchRecipeError(error) {
  return dispatch => {
    dispatch(fetchingRecipe(false));
    return {
      type: "FETCHING_RECIPES_ERROR",
      error
    };
  };
}

export function fetchRecipes() {
  return async dispatch => {
    try {
      dispatch(fetchingRecipes(true));
      const res = await API("/recipes", { method: "GET" });
      return dispatch(fetchRecipesSuccess(res.data.data));
    } catch (e) {
      dispatch(fetchRecipesError(e));
    }
  };
}

export function fetchRecipe(id) {
  return async dispatch => {
    try {
      dispatch(fetchingRecipe(true));
      const res = await API(`/recipes/${id}`, { method: "GET" });
      console.log('fetch reicpe', res)
      return dispatch(fetchRecipeSuccess(res.data.data));
    } catch (e) {
      dispatch(fetchRecipeError(e));
    }
  };
}
