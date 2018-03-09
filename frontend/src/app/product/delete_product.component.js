// component that contains the logic to delete a product
import React, { Component } from 'react';
import $ from 'jquery';

export default class DeleteProductComponent extends Component{
    constructor(props) {
        super(props)
        //this.deleteProduct = this.deleteProduct.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    /// on mount, change header text
    componentDidMount(){
        $('.page-header h1').text('删除产品');
    }
 
// handle single row deletion

    onDelete(e){
        let self = this;
        var id = self.props.id;
        fetch("/product/delete", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'id' : id})
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data.code === 200){
                self.props.changeAppMode('read');
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    render(){
     
        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>确定要删除此产品吗?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                    className='btn btn-danger m-r-1em'>删除</button>
                                <button onClick={() => this.props.changeAppMode('read')}
                                    className='btn btn-primary'>取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
}
