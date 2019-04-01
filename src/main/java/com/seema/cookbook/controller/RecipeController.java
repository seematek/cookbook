package com.seema.cookbook.controller;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seema.cookbook.domain.Recipe;
import com.seema.cookbook.service.RecipeService;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
// Saturday try test two - our new test!!!
	RecipeService recipeService;
	
	@Autowired
	public RecipeController(RecipeService recipeService) {
		this.recipeService = recipeService;
	}
	
	@GetMapping("/{id}")
	public Recipe getRecipe(@PathVariable int id) {
		return recipeService.getRecipe(id);		
	}
	
	@GetMapping("/")
	public Collection<Recipe> getRecipes() {
		System.out.println("In getRecipes !!!!");
		return recipeService.getRecipes();	
	}
	
	@PostMapping("/")
	public boolean addRecipe(@RequestBody Recipe recipe) {
		return recipeService.addRecipe(recipe);
		
	}
	
	@DeleteMapping("/{id}")
	public boolean deleteRecipe(@PathVariable int id) {
		return recipeService.deleteRecipe(id);		
	}

}
