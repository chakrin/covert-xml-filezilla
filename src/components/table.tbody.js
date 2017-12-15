import React, { Component } from 'react';
import TableTD from './table.td';

class TableTBody extends Component {

	render() {

		let {body, col} = this.props;
		const items = body.length === 0 ? <tr key={'0'}><td className="empty" colSpan={col} >No Result.</td></tr> : body.map((v,k) => <TableTD key={k} content={v} />);

		return (
			<tbody>{items}</tbody>
		);
	}
}

export default TableTBody;