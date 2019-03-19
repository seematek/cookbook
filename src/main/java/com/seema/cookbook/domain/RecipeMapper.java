package com.seema.cookbook.domain;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class RecipeMapper implements RowMapper<Recipe> {

	@Override
	public Recipe mapRow(ResultSet rs, int rowNum) throws SQLException {
		Recipe recipe = new Recipe();
		recipe.setId(rs.getInt("id"));
		recipe.setName(rs.getString("name"));
		recipe.setDescription(rs.getString("description"));
		return recipe;
	}

}
