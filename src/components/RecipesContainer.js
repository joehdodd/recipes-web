import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { APIContext } from "./APIContext";
import RecipeRow from "./RecipeRow";
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";

const Recipes = ({ text, recipes, setSelectedRecipe, searchTerm, user }) => {
  return recipes && recipes.length ? (
    recipes.map(recipe => (
      <RecipeRow
        user={user}
        key={recipe.id}
        recipe={recipe}
        handleSelect={() => setSelectedRecipe(recipe.id)}
      />
    ))
  ) : (
    <div className="recipe-row">
      <h3>
        Whoops! {text}{" "}
        <span role="img" aria-label="crying emoji">
          😩
        </span>
      </h3>
    </div>
  );
};

class RecipesContainer extends React.Component {
  handleRenderRecipe = () => {
    return this.props.editingRecipe ? (
      <div className="content-section">
        <RecipeForm
          inputValues={this.props.selectedRecipe}
          handleSubmit={inputValues =>
            this.props.handleUpdateRecipe(inputValues)
          }
        />
        <button
          style={{ margin: "4px" }}
          onClick={() => this.props.setEditingRecipe(false)}
        >
          Cancel
        </button>
      </div>
    ) : (
      <Recipe
        userRecipe={
          this.props.user &&
          this.props.user.id &&
          this.props.user.id.toString() ===
            this.props.selectedRecipe.userId.toString()
            ? true
            : false
        }
        user={this.props.user}
        handleEditRecipe={() => this.props.setEditingRecipe(true)}
        selectedRecipe={this.props.selectedRecipe}
        setSelectedRecipe={this.props.setSelectedRecipe}
        handleFavoriteRecipe={this.props.handleFavoriteRecipe}
      />
    );
  };
  render() {
    return (
      <>
        {!this.props.fetching && (
          <>
            {this.props.selectedRecipe.id ? (
              this.handleRenderRecipe()
            ) : (
              <Recipes
                text={
                  this.props.user
                    ? "You don't have any recipes!"
                    : "There are no recipes!"
                }
                user={this.props.user}
                recipes={this.props.recipes}
                setSelectedRecipe={this.props.setSelectedRecipe}
                searchTerm={this.props.searchTerm}
              />
            )}
          </>
        )}
        {this.props.fetching && (
          <div className="recipe-row">
            <h3>
              Loading yummy...{" "}
              <span role="img" aria-label="Yummy emoji">
                😋
              </span>
            </h3>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ recipesReducer }) => {
  return {
    recipes: recipesReducer.recipes
  };
};

export default withRouter(connect(mapStateToProps)(RecipesContainer));
