import { nanoid } from 'nanoid';
import React from 'react';
import TableRow from './TableRow';

const Table = ({data}) => {
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
					</tr>
				</thead>

				<tbody>
					{data && data.map(el => <TableRow 
						name={el.name}
						email={el.email}
						phone={el.phone}
						photo={el.photo}
						key={el.id}
					/>
					)}
				</tbody>

				<tfoot>
					<tr>
						<td rowSpan={4}>schweg</td>
					</tr>
				</tfoot>
				<caption>A table of things</caption>
			</table>
		</div>
	)
}

export default Table;