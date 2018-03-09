// component that contains the logic to update a product
import React, { Component } from 'react';
import $ from 'jquery';
export default class UpdateProductComponent extends Component{

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            selectedCategoryId: 0,
            id: 0,
            name: '',
            description: '',
            price: 0,
            successUpdate: null
        }
        this.onCategoryChange = this.onCategoryChange.bind(this); 
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
// on mount, fetch all categories and one product data to stored them as this component's state
    componentDidMount(){
        var self = this;
        // read categories
        self.serverRequestCat = fetch("/category/query",{
                method: 'GET'
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function(categories) {
                self.setState({
                    categories: categories
                });
            }).catch(err => {
                console.log('caught it!', err);
            });

        // read one product data

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
            self.setState({selectedCategoryId: product.categoryId});
            self.setState({id: product.id});
            self.setState({name: product.name});
            self.setState({description: product.description});
            self.setState({price: product.price});
        }).catch(err => {
            console.log('caught it!', err);
        });
        $('.page-header h1').text('更新产品');
    }
 
// on unmount, kill categories fetching in case the request is still pending
// componentWillUnmount() {
//     this.serverRequestCat.abort();
//     this.serverRequestProd.abort();
// }
 
// handle form field changes here
// handle category change
onCategoryChange(e){
    this.setState({selectedCategoryId: e.target.value});
}
 
// handle name change
onNameChange(e){
    this.setState({name: e.target.value});
}
 
// handle description change
onDescriptionChange(e){
    this.setState({description: e.target.value});
}
 
// handle price change
onPriceChange(e){
    this.setState({price: e.target.value});
}
 
// handle save changes button here
 
// handle save changes button clicked
onSave(e){
    let self = this;
    // data in the form
    var form_data={
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        categoryId: this.state.selectedCategoryId
    };
 
    // submit form data to api
    fetch("/product/edit", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form_data)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        console.log(data)    
        if(data.code === 200){
           // api message
            self.setState({successUpdate: data.msg});
        }
    }).catch(function(err) {
        console.log(err)
    });
    e.preventDefault();
}
 
// render component here
 
    render() {
        var categoriesOptions = this.state.categories.map(function(category){
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });
     
        return (
            <div>
                {
                    this.state.successUpdate === "更新成功" ?
                        <div className='alert alert-success'>
                            产品已更新
                        </div>
                    : null
                }
     
                {
                    this.state.successUpdate === "未更新成功" ?
                        <div className='alert alert-danger'>
                            产品未更新成功，请重试
                        </div>
                    : null
                }
     
                <a 
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    返回产品列表
                </a>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>名称</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.name}
                                    required
                                    onChange={this.onNameChange} />
                            </td>
                        </tr>
     
                        <tr>
                            <td>描述</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.description}
                                    onChange={this.onDescriptionChange}></textarea>
                            </td>
                        </tr>
     
                        <tr>
                            <td>价格 (元)</td>
                            <td>
                                <input
                                    type='number'
                                    step="0.01"
                                    className='form-control'
                                    value={this.state.price}
                                    required
                                    onChange={this.onPriceChange}/>
                            </td>
                        </tr>
     
                        <tr>
                            <td>类别</td>
                            <td>
                                <select
                                    onChange={this.onCategoryChange}
                                    className='form-control'
                                    value={this.state.selectedCategoryId}>
                                    <option value="-1">选择类别...</option>
                                    {categoriesOptions}
                                    </select>
                            </td>
                        </tr>
     
                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.onSave}>保存</button>
                            </td>
                        </tr>
     
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}