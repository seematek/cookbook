package com.seema.cookbook.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.seema.cookbook.domain.Recipe;

@Repository
public interface RecipeRepository {
	
	public Recipe getRecipe(int id);
	
	public Collection<Recipe> getRecipes();
	
	public boolean addRecipe(Recipe recipe);
	
	public boolean updateRecipe(Recipe recipe);
	
	public boolean deleteRecipe(int id);
	
}
