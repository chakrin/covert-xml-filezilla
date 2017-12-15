import React, { Component } from 'react';

class Alert extends Component {
  render() {
  	let {status} = this.props;
    return (
    	<div className={status.type}>
	      	<p><strong>{status.type}:</strong> {status.message}</p>
    	</div>
    );
  }
}

export default Alert;
