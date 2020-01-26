import API from "../../API";

function fetchingRecipes(bool) {
  return {
    type: "FETCHING_RECIPES",
    fetching: bool
  };
}

function setRecipes(recipes) {
  return {
    type: "SET_RECIPES",
    recipes
  };
}

function fetchRecipesSuccess(recipes) {
  return dispatch => {
    dispatch(fetchingRecipes(false));
    dispatch(setRecipes(recipes));
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

export function fetchRecipes(id = undefined) {
  return async dispatch => {
    try {
      dispatch(fetchingRecipes(true));
      const endpoint = id ? `/recipes/${id}` : `/recipes`;
      const res = await API(endpoint, { method: "GET" });
      return dispatch(fetchRecipesSuccess(res.data.data));
    } catch (e) {
      dispatch(fetchRecipesError(e));
    }
  };
}
