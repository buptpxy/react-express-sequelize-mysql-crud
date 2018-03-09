// component that contains the functionalities that appear on top of
// the products table: create product
import React, { Component } from 'react';

export default class TopActionsComponent extends Component{
    render(){
        return (
            <div>
                <a 
                    onClick={() => this.props.changeAppMode('create')}
                    className='btn btn-primary margin-bottom-1em'> 新增产品
                </a>
            </div>
        );
    }
}
