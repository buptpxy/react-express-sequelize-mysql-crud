// component that contains all the logic and other smaller components
// that form the Read Products view
import React, { Component } from 'react';
import $ from 'jquery';
import TopActionsComponent from './top_actions.component.js';
import ProductsTable from './product_table.component.js';


export default class ReadProductsComponent extends Component{

    constructor(props) {
            super(props)
            this.state = {
                products: []
            }
            
        }  
    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
 
        let self = this;
        self.serverRequest = fetch('/product/queryAll', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({
                products: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        });
    }
 
    // on unmount, kill product fetching in case the request is still pending
    // componentWillUnmount() {
    //     this.serverRequest.abort();
    // }
 
    // render component on the page
    render() {
        // list of products
        var filteredProducts = this.state.products;
        $('.page-header h1').text('产品列表');
 
        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
 
                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
}
