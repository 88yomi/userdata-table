import React from 'react';
import TableRow from './TableRow';

const Table = ({ data, handleEdit }) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>name</th>
						<th>email</th>
						<th>phone</th>
						<th>hungry</th>
						<th>photo</th>
						<th>edit?</th>
					</tr>
				</thead>

				<tbody>
					{data && data.map(el => <TableRow
						name={el.name}
						email={el.email}
						phone={el.phone}
						hungry={el.hungry}
						photo={el.photo}
						key={el.id}
						id={el.id}
						handleEdit={handleEdit}
					/>
					)}
				</tbody>

				<tfoot>
					<tr>
						<td colSpan={6}>Data, collected by the collector</td>
					</tr>
				</tfoot>
				<caption>A table of things</caption>
			</table>
		</div>
	)
}

export default Table;