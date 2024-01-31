export default function Table({ columns, rows }: Readonly<{
  columns: {
    label?: string;
    name?: string;
    render?: (row: any) => any;
  }[];
  rows: any[];
}>) {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.name}
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td
                key={column.name}
                className="whitespace-nowrap py-4 px-3 text-sm text-gray-900"
              >
                {column.render ? column.render(row) : row[column.name as string]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
