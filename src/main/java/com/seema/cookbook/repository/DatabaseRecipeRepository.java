package com.seema.cookbook.repository;

import java.util.Collection;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.seema.cookbook.domain.Recipe;
import com.seema.cookbook.domain.RecipeMapper;

@Repository("databaseRecipeRepository")
public class DatabaseRecipeRepository implements RecipeRepository {
	private JdbcTemplate jdbc;
	
	private final String SQL_INSERT_RECIPE = "insert into recipe (id,name,description) values (?,?,?)";
	private final String SQL_GET_RECIPE = "select * from recipe where id=?";
	private final String SQL_GET_ALL_RECIPES = "select * from recipe";
	private final String SQL_DELETE_RECIPE = "delete from recipe where id=?";
	private final String SQL_UPDATE_RECIPE = "update recipe set name=?, description=? where id=?";

	@Autowired
	public DatabaseRecipeRepository(DataSource ds) {
		this.jdbc =  new JdbcTemplate(ds);
	}

	@Override
	public Recipe getRecipe(int id) {
		return jdbc.queryForObject(SQL_GET_RECIPE, new Object[] {id}, new RecipeMapper());
	}

	@Override
	public Collection<Recipe> getRecipes() {
		return jdbc.query(SQL_GET_ALL_RECIPES, new RecipeMapper());
	}

	@Override
	public boolean addRecipe(Recipe recipe) {
		return jdbc.update(SQL_INSERT_RECIPE, recipe.getId(), recipe.getName(), recipe.getDescription())>0;	
	}
	
	@Override
	public boolean updateRecipe(Recipe recipe) {
		return jdbc.update(SQL_UPDATE_RECIPE, recipe.getName(), recipe.getDescription(), recipe.getId())>0;	
	}

	@Override
	public boolean deleteRecipe(int id) {
		return jdbc.update(SQL_DELETE_RECIPE,id)>0;
	}

}
