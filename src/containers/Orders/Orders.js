import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../AxiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders(this.props.token, this.props.userId);
	}

	render() {
		let orders = <Spinner />;

		if (!this.props.loading) {
			if (this.props.orders[0] === undefined) {
				orders = (
					<div className={classes.NoOrders}>
						<div className={classes.DefaultBox}>
							<h3 className={classes.DefaultLabel}>No Orders Listed!</h3>
						</div>
					</div>
				);
			} else {
				orders = this.props.orders.map((order) => (
					<Order key={order.id} ingredients={order.ingredients} price={order.price} />
				));
			}
		}

		return <div className={classes.Orders}>{orders}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		orders  : state.order.orders,
		loading : state.order.loading,
		token   : state.auth.token,
		userId  : state.auth.userId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders : (token, userId) => dispatch(actions.fetchOrders(token, userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
