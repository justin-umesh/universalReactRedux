/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './update';
import Layout from '../../components/Layout';

// const Home = () => (<h3>Hello Welcome {this.props.home}</h3>);
class Product extends Component {
  componentDidMount() {
    // this.props.fetchProducts();
  }

  renderUsers() {
    return this.props.product.product.map(user => <li key={user.id}>{user.name}</li>);
  }

  render() {
    return (
      <Layout>
        THIS IS PRODUCT PAGE:
        <ul>{this.renderUsers()}</ul>
      </Layout>
    );
  }
}

function loadData(store) {
  return store.dispatch(fetchProducts());
}

function mapStateToProps(state) {
  return { product: state.product };
}

Product.defaultProps = {
  product: [],
};

export default {
  loadData,
  component: connect(mapStateToProps, { fetchProducts })(Product),
};
