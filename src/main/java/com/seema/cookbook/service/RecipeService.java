package com.seema.cookbook.service;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.seema.cookbook.domain.Recipe;
import com.seema.cookbook.repository.RecipeRepository;

@Service
public class RecipeService {
	
	RecipeRepository recipeRepository;
	
	@Autowired
	public RecipeService(@Qualifier("databaseRecipeRepository") RecipeRepository recipeRepository){
		this.recipeRepository = recipeRepository;
	}
	
	public Recipe getRecipe(int id) {
		System.out.println("In getRecipe " + id);
		return recipeRepository.getRecipe(id);		
	}
	
	public Collection<Recipe> getRecipes(){
		System.out.println("In getRecipes");
		return recipeRepository.getRecipes();	
	
	}
	
	public boolean addRecipe(Recipe recipe) {
		System.out.println("In addRecipe " + recipe.toString());
		return recipeRepository.addRecipe(recipe);
	}
	
	public boolean deleteRecipe(int id) {
		System.out.println("In deleteRecipe " + id);
		return recipeRepository.deleteRecipe(id);
	}

}
