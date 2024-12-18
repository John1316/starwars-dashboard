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
    console.log("🚀 ~ data:", !data?.length)
    return (
        <div className="min-h-[50vh] w-full h-full overflow-x-auto rounded-lg border-2 border-[var(--rebel-yellow)]">
            {(() => {
                if (isLoading) {
                    return  <div className="min-h-[50vh] flex items-center justify-center">
                        <LoadingScreen />
                    </div>
                }
                if(!data?.length){
                    return <div className="min-h-[50vh] flex items-center justify-center">
                        <h4 className='text-white'>{emptyMessage}</h4>
                    </div>
                }
                return <table className="w-full min-w-full table-auto">
                    <thead>
                        <tr className="border-b-2 border-[var(--rebel-yellow)]">
                            {columns.map((column: TableLayoutColumn) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-4 text-white text-left text-sm font-semibold ${column.sortable ? 'cursor-pointer hover:text-[var(--rebel-yellow)]' : ''
                                        }`}
                                    onClick={() => column.sortable && onSort && onSort(column.key)}
                                >
                                    <div className="flex capitalize items-center gap-2">
                                        {column.label}
                                        {column.sortable && (
                                            <span className="text-[var(--rebel-yellow)]">
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
                    <tbody className="divide-y divide-[var(--rebel-yellow)]">
                        {!data?.length ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-8 text-center"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data?.map((row: any, rowIndex: number) => (
                                <tr
                                    key={rowIndex}
                                    className="transition-colors hover:bg-[var(--rebel-yellow-overlay)]"
                                >
                                    {columns.map((column: TableLayoutColumn) => (
                                        <td
                                            key={column.key}
                                            className="px-6 py-4 text-sm truncate text-white"
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

