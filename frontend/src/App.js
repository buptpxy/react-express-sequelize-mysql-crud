import React, { Component } from 'react';
import ReadOneProductComponent from './app/product/read_one_product.component.js';
import CreateProductComponent from './app/product/create_product.component.js';
import UpdateProductComponent from './app/product/update_product.component.js';
import DeleteProductComponent from './app/product/delete_product.component.js';
import ReadProductsComponent from './app/product/read_products.component.js';

export default class App extends Component{ 
    // initial mode is 'read' mode
    
    constructor(props) {
        super(props)
        this.state = {
            currentMode: 'read',
            id: null
        }
        this.changeAppMode = this.changeAppMode.bind(this); 
    }
    // used when use clicks something that changes the current mode
    changeAppMode(newMode, id){
        this.setState({currentMode: newMode});
            if(id !== undefined){
            this.setState({id: id});
        }
    }
 
    // render the component based on current or selected mode
    render(){
 
        var modeComponent =
            <ReadProductsComponent
            changeAppMode={this.changeAppMode} />;
 
        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneProductComponent id={this.state.id} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdateProductComponent id={this.state.id} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeleteProductComponent id={this.state.id} changeAppMode={this.changeAppMode}/>;
                break;
            default:
                break;
        }
 
        return modeComponent;
    }
}
