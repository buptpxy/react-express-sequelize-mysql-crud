// component that contains the logic to read one product
import React, { Component } from 'react';
import $ from 'jquery';

export default class ReadOneProductComponent extends Component{

    constructor(props) {
            super(props)
            this.state = {
                id: 0,
                name: '',
                description: '',
                price: 0,
                category_name: ''
            }
            
        }  
// on mount, read product data and them as this component's state
    componentDidMount(){
        let self = this;
        var data = {
            id: self.props.id
        }
        self.serverRequestProd = fetch('/product/queryOne', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(product) {
            self.setState({category_name: product.Category.name});
            self.setState({id: product.id});
            self.setState({name: product.name});
            self.setState({description: product.description});
            self.setState({price: product.price});
        }).catch(err => {
            console.log('caught it!', err);
        });
        $('.page-header h1').text('产品详情');
    }
 
// on unmount, kill categories fetching in case the request is still pending
    // componentWillUnmount() {
    //     this.serverRequestProd.abort();
    // }
 
// render component html will be here
    render() {
     
        return (
            <div>
                <a 
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    产品列表
                </a>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>名称</td>
                            <td>{this.state.name}</td>
                        </tr>
     
                        <tr>
                            <td>描述</td>
                            <td>{this.state.description}</td>
                        </tr>
     
                        <tr>
                            <td>价格 (元)</td>
                            <td>￥{parseFloat(this.state.price).toFixed(2)}</td>
                        </tr>
     
                        <tr>
                            <td>类别</td>
                            <td>{this.state.category_name}</td>
                        </tr>
     
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}
