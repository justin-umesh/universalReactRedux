import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Layout.css';
import Header from '../Header';
import Footer from '../Footer';

class Layout extends Component {
  componentDidMount() {
    // this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
