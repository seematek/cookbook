import React, { Component } from 'react';
import { FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends Component {
    state = {
        recipes: [],
        newRecipeModal : false,
        editRecipeModal : false,
        newRecipeData : {
            id: '',
            name: '',
            description: ''
        },
        editRecipeData : {
            id: '',
            name: '',
            description: ''
        },
        apiBaseUrl:"http://ec2-18-216-187-77.us-east-2.compute.amazonaws.com:8888/cookbook/recipes/"
        //apiBaseUrl:"http://localhost:9080/cookbook/recipes/"
    }
    componentWillMount() {
        this.refreshRecipes();

    }
    toggleNewRecipeModal() {
        this.setState( {
                newRecipeModal : !this.state.newRecipeModal
            }
        );
    }
    toggleEditRecipeModal() {
        this.setState( {
                editRecipeModal : !this.state.editRecipeModal,
                //editRecipeData : { id:'', name:'', description:''}
            }
        )
        if( this.state.editRecipeModal===0) {
            console.log("we here?");
            this.setState({editRecipeData : { id: '', name: '', description: ''}});
        }
    }
    addRecipe(){
        let {apiBaseUrl} = this.state
        axios.post(apiBaseUrl, this.state.newRecipeData).then((response) => {
            console.log(response.data);
            let {recipes} = this.state;
            recipes.push(this.state.newRecipeData);
            this.setState({recipes, newRecipeModal : false, newRecipeData : {
                id: '',
                name: '',
                description: ''
            }});
        })
    }
    editRecipe(id,name,description){
        this.setState({
            editRecipeData : { id: id, name: name, description: description},
            editRecipeModal: true
        });
    }

    updateRecipe(){
        //console.log(this.state.editRecipeData.id);
        let {id, name, description} = this.state.editRecipeData;
        console.log(id);
        console.log(name);
        console.log(description);
        let {apiBaseUrl} = this.state
        console.log(apiBaseUrl);

        axios.put(apiBaseUrl + id, {
            name: name,
            description: description
        }).then((response) => {
            console.log(response.data);
            this.refreshRecipes();
            this.setState( {
                editRecipeModal: false,
                editRecipeData: {id:'',name:'',description:''}
            })
        })
    }
    refreshRecipes(){
        let {apiBaseUrl} = this.state
        axios.get(apiBaseUrl).then((response) => {
            this.setState({
                recipes: response.data
            })
        });

    }

    deleteRecipe(id){
        let {apiBaseUrl} = this.state
        console.log(apiBaseUrl + id);
        axios.delete(apiBaseUrl+id).then((response) => {
            console.log(response.data);
            this.refreshRecipes();
        })
    }

    render() {
        let recipes = this.state.recipes.map((recipe) => {
            return (
                <tr key={recipe.id}>
                    <td>{recipe.id}</td>
                    <td>{recipe.name}</td>
                    <td>{recipe.description}</td>
                    <td>
                        <Button color="success" size="sm" onClick={this.editRecipe.bind(this, recipe.id, recipe.name, recipe.description)} className="mr-2">Edit</Button>
                        <Button color="danger" size="sm" onClick={this.deleteRecipe.bind(this, recipe.id)}>Delete</Button>
                    </td>
                </tr>
            )
        });

        return (
            <div className="App container">
                <h1>Cookbook</h1>
                <div>
                    <Button className="my-3"color="primary" onClick={this.toggleNewRecipeModal.bind(this)}>Add Recipe</Button>
                    <Modal isOpen={this.state.newRecipeModal} toggle={this.toggleNewRecipeModal}>
                        <ModalHeader toggle={this.toggleNewRecipeModal}>Add a new recipe</ModalHeader>
                        <ModalBody>
                        <FormGroup>
                            <Label for="id">Id</Label>
                            <Input id="id" value={this.state.newRecipeData.id} onChange={(e)=> {
                                let newRecipeData = this.state;
                                newRecipeData.id = e.target.value;
                                this.setState({newRecipeData});
                             }
                            }  />
                            <Label for="name">Name</Label>
                            <Input id="name" value={this.state.newRecipeData.name} onChange={(e)=> {
                                let newRecipeData = this.state;
                                newRecipeData.name = e.target.value;
                                this.setState({newRecipeData});
                             }
                            }  />
                            <Label for="description">Description</Label>
                            <Input id="description" value={this.state.newRecipeData.description} onChange={(e)=> {
                                let newRecipeData = this.state;
                                newRecipeData.description = e.target.value;
                                this.setState({newRecipeData});
                             }
                            }  />
                         </FormGroup>                        
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addRecipe.bind(this)}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewRecipeModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.editRecipeModal} toggle={this.toggleEditRecipeModal}>
                        <ModalHeader toggle={this.toggleEditRecipeModal}>Edit a recipe</ModalHeader>
                        <ModalBody>
                        <FormGroup>
                            <Label for="id">Id</Label>
                            <Input id="id" value={this.state.editRecipeData.id} onChange={(e)=> {
                                let {editRecipeData} = this.state;
                                editRecipeData.id = e.target.value;
                                this.setState({editRecipeData});
                             }
                            }  />
                            <Label for="name">Name</Label>
                            <Input id="name" value={this.state.editRecipeData.name} onChange={(e)=> {
                                let {editRecipeData} = this.state;
                                editRecipeData.name = e.target.value;
                                this.setState({editRecipeData});
                             }
                            }  />
                            <Label for="description">Description</Label>
                            <Input id="description" value={this.state.editRecipeData.description} onChange={(e)=> {
                                let {editRecipeData} = this.state;
                                editRecipeData.description = e.target.value;
                                this.setState({editRecipeData});
                             }
                            }  />
                         </FormGroup>                        
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateRecipe.bind(this)}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditRecipeModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes}
                    </tbody>
                </Table>
            </div>
        );
    }
}


export default App;
