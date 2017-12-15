import React, { Component } from 'react';

class Form extends Component {
	constructor(props){
		super(props);
		this.xxx = this.xxx.bind(this);
	}

	xxx(){
		console.log('xxx')
	}

	render() {
		return (
			<button onClick={this.xxx}>CLICK</button>	
		);
	}
}

export default Form;