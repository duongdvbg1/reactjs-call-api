import React, { Component } from 'react';
import ProductList from './../../components/ProductList';
import ProductItem from './../../components/ProductItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchProductsRequest, actDeleteProductRequest } from './../../actions';

class ProductListPage extends Component {

	componentDidMount() {
		this.props.fetchAllProducts()
	}

	onDelete = (id) => {
		this.props.onDeleteProduct(id);
	}

	render() {

		var {products} = this.props;

		return (
			<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									
				<Link to="/product/add"  className="btn btn-info mb-15">Add Product</Link>
				
				<ProductList>
					{ this.showProducts(products) }
				</ProductList>
				
			</div>
		)
	}

	showProducts(products) {
		var result = null;

		if(products.length > 0) {
			result = products.map((product,i)=>{
				return (
					<ProductItem 
						key={i}
						product={product}
						index={i}
						onDelete={this.onDelete}
					/>
				)
			})
			return result;
		}
	}
}

const mapStateToProps = state => {
	return {
		products: state.products
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllProducts : () => {
			dispatch(actFetchProductsRequest());
		},
		onDeleteProduct : (id) => {
			dispatch(actDeleteProductRequest(id));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
