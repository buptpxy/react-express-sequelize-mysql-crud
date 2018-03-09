import React, { Component } from 'react';
import $ from 'jquery';

export default class CreateProductComponent extends Component{
// initialize values

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            selectedCategoryId: -1,
            name: '',
            description: '',
            price: '',
            successCreation: null
        }
        
        this.onCategoryChange = this.onCategoryChange.bind(this); 
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSave = this.onSave.bind(this);
        
    } 
// on mount, get all categories and store them in this component's state
    componentDidMount() {
        var self = this;
        self.serverRequest = fetch("/category/query",{
                method: 'GET'
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function(data) {
                self.setState({
                    categories: data
                });
            }).catch(err => {
                console.log('caught it!', err);
            });
        $('.page-header h1').text('新增产品');
    }
 
// on unmount, stop getting categories in case the request is still loading
    // componentWillUnmount() {
    //     this.serverRequest.abort();
    // }
 
// handle form field changes here
 
// handle category change
    onCategoryChange(e) {
        this.setState({selectedCategoryId: e.target.value});
    }
 
// handle name change
    onNameChange(e) {
        this.setState({name: e.target.value});
    }
 
// handle description change
    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }
 
// handle price change
    onPriceChange(e) {
        this.setState({price: e.target.value});
    }
 
// handle save button here
 
// handle save button clicked
    onSave(e){
        let self = this;
        // data in the form
        var form_data={
            name: self.state.name,
            description: self.state.description,
            price: self.state.price,
            categoryId: self.state.selectedCategoryId
        };
     
        // submit form data to api
        fetch("/product/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form_data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data.code === 200){
               // api message
                self.setState({successCreation: data.msg});
     
                // empty form
                self.setState({name: ""});
                self.setState({description: ""});
                self.setState({price: ""});
                self.setState({selectedCategoryId: -1});
                //self.props.changeAppMode('read')
            }
        }).catch(function(err) {
            console.log(err)
        });
        
        e.preventDefault();
    }
 
// render component here
    render() {
     
        // make categories as option for the select tag.
        var categoriesOptions = this.state.categories.map(function(category){
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });
     
        /*
        - tell the user if a product was created
        - tell the user if unable to create product
        - button to go back to products list
        - form to create a product
        */
        return (
        <div>
            {
     
                this.state.successCreation === "增加成功" ?
                    <div className='alert alert-success'>
                        产品已新增
                    </div>
                : null
            }
     
            {
     
                this.state.successCreation === "未增加成功" ?
                    <div className='alert alert-danger'>
                        未能新增产品，请重试
                    </div>
                : null
            }
     
            <a 
                onClick={() => this.props.changeAppMode('read')}
                className='btn btn-primary margin-bottom-1em'> 返回产品列表
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
                            onChange={this.onDescriptionChange}>
                            </textarea>
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