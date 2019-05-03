package com.seema.cookbook.controller;

import java.util.Collection;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seema.cookbook.domain.Recipe;
import com.seema.cookbook.service.RecipeService;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins="*", maxAge=3600)
public class RecipeController {
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
		System.out.println("In getRecipes PLEASE!!!!");
		return recipeService.getRecipes();	
	}
	
	@PostMapping("/")
	public boolean addRecipe(@RequestBody Recipe recipe) {
		System.out.println("In addRecipe !!!!");
		return recipeService.addRecipe(recipe);
		
	}
	
	@PutMapping("/{id}")
	public boolean updateRecipe(@RequestBody Recipe recipe, @PathVariable int id) {
		System.out.println("In updateRecipe !!!!");
		recipe.setId(id);
		return recipeService.updateRecipe(recipe);
		
	}
	@DeleteMapping("/{id}")
	public boolean deleteRecipe(@PathVariable int id) {
		System.out.println("In deleteRecipe !!!!");
		return recipeService.deleteRecipe(id);		
	}

}
