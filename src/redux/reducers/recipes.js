export default (
  state = {
    recipes: [],
    fetchingRecipes: false,
    fetchingRecipe: false,
    recipe: {}
  },
  action
) => {
  switch (action.type) {
    case "FETCHING_RECIPES":
      return {
        ...state,
        fetchingRecipes: action.fetching
      };
    case "FETCHING_RECIPE":
      return {
        ...state,
        fetchingRecipe: action.fetching
      };
    case "SET_RECIPES":
      return {
        ...state,
        recipes: [...action.recipes]
      };
    case "SET_RECIPE":
      return {
        ...state,
        recipe: action.recipe
      };
    default:
      return state;
  }
};
