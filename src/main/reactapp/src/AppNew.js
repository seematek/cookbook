import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
 
class RecipeList extends React.Component {
    state = {
        recipes: [],
        apiBaseUrl:"http://ec2-18-216-187-77.us-east-2.compute.amazonaws.com:8888/cookbook/recipes/"
        //apiBaseUrl:"http://localhost:9080/cookbook/recipes/"
    }

    componentWillMount() {
        this.refreshRecipes();
    }

    refreshRecipes(){
        let {apiBaseUrl} = this.state
        axios.get(apiBaseUrl).then((response) => {
            this.setState({
                recipes: response.data
            })
        });
    }
    render(){  
        let recipelist 
        recipelist = this.state.recipes.map((recipe)=><li><a href={'/recipes/' + recipe.id}>{recipe.name} ( {recipe.id} )</a></li>)
        return <div>
            <h3>Recipes</h3>
            <ul>{recipelist}</ul>
        </div>;
    }
}

class Recipe extends React.Component {
    state = {
        recipe:{id:'', name:'', description:''},
        apiBaseUrl:"http://ec2-18-216-187-77.us-east-2.compute.amazonaws.com:8888/cookbook/recipes/"
        //apiBaseUrl:"http://localhost:9080/cookbook/recipes/"
    }

    componentWillMount() {
        this.fetchRecipe();
    }

    fetchRecipe(){
        let id = this.props.match.params.id
        let {apiBaseUrl} = this.state
        axios.get(apiBaseUrl+id).then((response) => {
            this.setState({
                recipe: response.data
            })
        });
    }
    deleteRecipe(){
        let {apiBaseUrl} = this.state
        let {id} = this.state.recipe
        axios.delete(apiBaseUrl+id).then((response) => {
            console.log(response.data);
        })
        this.props.history.push("/")
    }
    render(){
        return (
            <div>
                <h3>{this.state.recipe.name}</h3>
                <pre >{this.state.recipe.description}</pre>
                <button onClick={this.deleteRecipe.bind(this)}>Delete</button>
            </div>
        )
    }
}

class AddRecipe extends React.Component {
    state = {
        recipe:{id:'', name:'', description:''},
        apiBaseUrl:"http://ec2-18-216-187-77.us-east-2.compute.amazonaws.com:8888/cookbook/recipes/",
        //apiBaseUrl:"http://localhost:9080/cookbook/recipes/",
        redirect: false
    }
    componentWillMount() {
        this.setState({redirect:false})  
        console.log(this.state.redirect)  
    }
    addRecipe(){
        console.log("In add recipe: are we hwere");
        let {apiBaseUrl} = this.state
        axios.post(apiBaseUrl, this.state.recipe).then((response) => {
            console.log(response.data);
        })
        this.setState({redirect:true})
    }
    render(){
            var textStyle = {
                width: "100%"
            };

            let recipeform = 
            <div>
                <h3>Add Recipe</h3>
                <form>
                    <table width="50%">
                        <tbody>
                            <tr>
                                <td width="30%" ><label for="id">Id: </label></td>
                                <td width="70%"><input style={textStyle} id="id" value={this.state.recipe.id} onChange={ (e)=> {
                                    let recipe = this.state
                                    recipe.id = e.target.value
                                    this.setState({recipe})
                                }
                                    }
                                /></td>
                            </tr>
                            <tr><td></td><td></td></tr>
                            <tr>
                                <td><label for="name">Name: </label></td>
                                <td><input style={textStyle} id="name" value={this.state.recipe.name} onChange={ (e) => {
                                    let recipe = this.state
                                    recipe.name = e.target.value
                                    this.setState({recipe})
                                }
                                    } /></td>
                            </tr>
                            <tr/>
                            <tr><td></td><td></td></tr>
                            <tr>
                                <td><label for="description">Description: </label></td>
                                <td><textarea style={textStyle} rows="10" id="description" value={this.state.recipe.description} onChange={ (e) => {
                                    let recipe = this.state
                                    recipe.description = e.target.value
                                    this.setState({recipe})                                   
                                }
                                    } /></td>
                            </tr>
                            <tr/>
                        </tbody>
                    </table><br />
                    <button onClick={this.addRecipe.bind(this)}>Save</button>
                </form>
            </div>
        if(!this.state.redirect)
            return recipeform
        else
            return <Redirect to="/" forceRefresh="true"/>
    }
}

class Error extends React.Component {
    render(){
        return (
            <div>
                <p>Error: Path does not exist!</p>
            </div>
        )
    }
}

export { RecipeList, Recipe, AddRecipe, Error };