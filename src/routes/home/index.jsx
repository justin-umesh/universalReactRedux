/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from './update';
import Layout from '../../components/Layout';

// const Home = () => (<h3>Hello Welcome {this.props.home}</h3>);
class Home extends Component {
  componentDidMount() {
    // this.props.fetchTodos();
  }

  renderUsers() {
    return this.props.users.todos.map(user => <li key={user.id}>{user.name}</li>);
  }

  render() {
    return (
      <Layout>
        Heres a big list of users:
        <ul>{this.renderUsers()}</ul>
      </Layout>
    );
  }
}

function loadData(store) {
  return store.dispatch(fetchTodos());
}

function mapStateToProps(state) {
  return { users: state.home };
}

Home.defaultProps = {
  users: [],
};

export default {
  loadData,
  component: connect(mapStateToProps, { fetchTodos })(Home),
};
