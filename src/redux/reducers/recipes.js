export default (
  state = {
    recipes: [],
    fetchingRecipes: false
  },
  action
) => {
  switch (action.type) {
    case "FETCHING_RECIPES":
      return {
        ...state,
        fetchingRecipes: action.fetching
      };
    case "SET_RECIPES":
      return {
        ...state,
        recipes: [...action.recipes]
      };
    default:
      return state;
  }
};
