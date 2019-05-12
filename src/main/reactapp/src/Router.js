import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import { RecipeList, Recipe, AddRecipe, Error } from './AppNew';
 
class Router extends React.Component {

    render(){  
        return (
            <BrowserRouter>
                <Navigation></Navigation>
                <Switch>
                    <Route path="/" component={RecipeList} exact />
                    <Route path="/recipes/:id" component={Recipe}/>
                    <Route path="/add_recipe" component={AddRecipe}/>
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>

        )
    }
}

class Navigation extends React.Component {
    render() {
        return (
            <div>
            <NavLink to="/">Home</NavLink>
            <NavLink  to="/add_recipe"> Add Recipe</NavLink>
            </div>
        )
    }
}

export default Router;