import React, { Component } from 'react';
import './ProductAction.css';
import { connect } from 'react-redux';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions';


class ProductActionPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: '',
			txtName: '',
			txtPrice: '',
			cbStatus: false
		}
	}

	componentDidMount() {
		var { match  } = this.props;
		if(match) {
			var id = match.params.id;
			
			this.props.onEditProduct(id);
			
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if(nextProps && nextProps.editProduct) {
			var { name, price, status, id } = nextProps.editProduct;
			this.setState({
				id: id,
				txtName: name,
				txtPrice: price,
				cbStatus: status
			})
		}
	}

	onChange = (e) => {
		var target = e.target;

		var name = target.name;
		var value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[name]: value
		})
	}

	onSave = (e) => {
		e.preventDefault();
		var { id, txtName, txtPrice, cbStatus } = this.state;
		var {history} = this.props;
		var product = {
			id: id,
			name: txtName,
			price: txtPrice,
			status: cbStatus
		}

		if(id) {
			this.props.onUpdateProduct(product);
			history.push("/products");
		} else {
			this.props.onAddProduct(product);
			history.goBack();
		}
	}

	btnBack = () => {
		var {history} = this.props;
		history.push("/products");
	}

	render() {
		var {txtName, txtPrice, cbStatus } = this.state;
		return (
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<form onSubmit = {this.onSave}>
					<div className="form-group">
						<label>Name: </label>
						<input 
							type="text" name="txtName" className="form-control"
							value={txtName}
							required
							onChange = {this.onChange}
						 />
					</div>
					<div className="form-group">
						<label>Price: </label>
						<input 
							type="number" name="txtPrice" className="form-control" 
							value={txtPrice}
							required
							onChange = {this.onChange}
						/>
					</div>
					<div className="form-group">
						<label>Status: </label>
					</div>
					<div className="checkbox">
						<label>
							<input 
							type="checkbox" name="cbStatus" 
							value={cbStatus}
							onChange = {this.onChange}
							checked={cbStatus}
							/>
							Active
						</label>
					</div>
					
					<button className="btn btn-danger btn-back mr-10" onClick={this.btnBack}>Back</button>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		editProduct : state.editProduct
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAddProduct : (product) => {
			dispatch(actAddProductRequest(product));
		},
		onEditProduct: (id) => {
			dispatch(actGetProductRequest(id));
		},
		onUpdateProduct: (product) => {
			dispatch(actUpdateProductRequest(product));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
