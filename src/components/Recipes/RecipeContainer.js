import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRecipe } from "../../redux/actions/recipes";
import Recipe from "./Recipe";

class RecipeContainer extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchRecipe(this.props.recipeId);
  }
  render() {
    const { recipe, fetchingRecipe } = this.props;
    console.log('recipe', recipe)
    return (
      <>{!fetchingRecipe && !!recipe.title && <Recipe recipe={recipe} />}</>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipe: id => {
      dispatch(fetchRecipe(id));
    }
  };
};

const mapStateToProps = ({ recipes }) => {
  return {
    recipe: recipes.recipe,
    fetchingRecipe: recipes.fetchingRecipe
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecipeContainer)
);
