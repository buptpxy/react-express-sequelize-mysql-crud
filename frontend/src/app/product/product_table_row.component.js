// component that renders a single product
import React, { Component } from 'react';

export default class ProductRow extends Component{

    render() {
    return (
        <tr>
            <td>{this.props.product.name}</td>
            <td>{this.props.product.description}</td>
            <td>￥{parseFloat(this.props.product.price).toFixed(2)}</td>
            <td>{this.props.product.Category.name}</td>
            <td>
                <a 
                    onClick={() => this.props.changeAppMode('readOne', this.props.product.id)}
                    className='btn btn-info m-r-1em'> 详情
                </a>
                <a 
                    onClick={() => this.props.changeAppMode('update', this.props.product.id)}
                    className='btn btn-primary m-r-1em'> 编辑
                </a>
                <a
                    onClick={() => this.props.changeAppMode('delete', this.props.product.id)}
                    className='btn btn-danger'> 删除
                </a>
            </td>
        </tr>
        );
    }
}