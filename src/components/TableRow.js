import React from 'react';

const TableRow = ({ name, email, phone, photo }) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{email}</td>
			<td>{phone}</td>
			<td>{photo}</td>
		</tr>
	)
}

export default TableRow;