import React, { Component } from 'react';

class TableTD extends Component {
	render() {

		let {content} = this.props;
		const items = content.map((v,k) => <td key={k}>{v}</td>)
		return (
			<tr>{items}</tr>
		);
	}
}

export default TableTD;