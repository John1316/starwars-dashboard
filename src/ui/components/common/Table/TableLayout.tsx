// components/Table/Table.jsx
import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import LoadingScreen from '../LoadingScreen';

export default function TableLayout({
    columns,
    data,
    sortColumn,
    sortDirection,
    onSort,
    isLoading,
    emptyMessage = "No data available"
}: TableProps) {
    return (
        <div className="w-full h-full overflow-x-auto rounded-lg border-2 border-[var(--lightsaber-blue)]">
            {(() => {
                if (isLoading) {
                    return <LoadingScreen />

                }
                return <table className="w-full min-w-full table-auto">
                    <thead>
                        <tr className="border-b-2 border-[var(--lightsaber-blue)]">
                            {columns.map((column: TableLayoutColumn) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-4 text-left text-sm font-semibold ${column.sortable ? 'cursor-pointer hover:text-[var(--rebel-yellow)]' : ''
                                        }`}
                                    onClick={() => column.sortable && onSort && onSort(column.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && (
                                            <span className="text-[var(--lightsaber-blue)]">
                                                {sortColumn === column.key ? (
                                                    sortDirection === 'asc' ? (
                                                        <ChevronUp size={16} />
                                                    ) : (
                                                        <ChevronDown size={16} />
                                                    )
                                                ) : (
                                                    <ChevronsUpDown size={16} />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--lightsaber-blue)]">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-8 text-center"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row: any, rowIndex: number) => (
                                <tr
                                    key={rowIndex}
                                    className="transition-colors hover:bg-[var(--hologram-blue)]"
                                >
                                    {columns.map((column: TableLayoutColumn) => (
                                        <td
                                            key={column.key}
                                            className="px-6 py-4 text-sm"
                                        >
                                            {column.render ? column.render(row) : row[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            })()}

        </div>
    );
};

