import React, { Component } from 'react';

class TableTHeader extends Component {
	
	render() {

		let {header} = this.props;
		const items = header.map((text, index) => <th key={index}>{text}</th>);

		return (
			<thead>
				<tr>{items}</tr>
			</thead>
		);
	}
}

export default TableTHeader;