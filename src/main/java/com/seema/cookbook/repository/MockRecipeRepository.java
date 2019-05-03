package com.seema.cookbook.repository;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.seema.cookbook.domain.Recipe;

@Repository("mockRecipeRepository")
public class MockRecipeRepository implements RecipeRepository {
	
	@Override
	public Recipe getRecipe(int id) {
		return new Recipe(id, "Instant Pot Poha", "Blah");		
	}
	
	@Override
	public Collection<Recipe> getRecipes(){
		return Arrays.asList(new Recipe(1, "Instant Pot Poha", "Blah"),
				 new Recipe(2, "Instant Pot Sambhar", "Blah Blah"),
				 new Recipe(3, "Instant Pot Daal", "Blah Blah Blah"));		
	}
	
	@Override
	public boolean addRecipe(Recipe recipe) {
		return true;
	}
	
	@Override
	public boolean updateRecipe(Recipe recipe) {
		return true;
	}
	
	@Override
	public boolean deleteRecipe(int id) {
		return true;	
	}

}
