import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
    	<div class="footers">
    		<footer>{this.props.children}</footer>
    	</div>

		);
  }
}

export default Footer;
