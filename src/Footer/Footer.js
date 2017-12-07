import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
    	<div>
    		<footer>{this.props.children}</footer>
    	</div>
	);
  }
}

export default Footer;
