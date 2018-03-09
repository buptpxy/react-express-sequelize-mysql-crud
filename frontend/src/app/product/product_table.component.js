// component for the whole products table
import React, { Component } from 'react';
import ProductRow from './product_table_row.component.js'
export default class ProductsTable extends Component{

    render() {
 
    var rows = this.props.products.map(function(product, i) {
            return (
                <ProductRow
                    key={i}
                    product={product}
                    changeAppMode={this.props.changeAppMode} />
            );
        }.bind(this));
 
        return(
            !rows.length
                ? <div className='alert alert-danger'>未查询到产品</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>描述</th>
                            <th>价格</th>
                            <th>类别</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
}