import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  render() {
    return (
    	<div>
    		<header>{this.props.children}</header>
    	</div>

		);
  }
}

export default Header;
