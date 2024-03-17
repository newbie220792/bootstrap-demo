import {createColumnHelper, flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table';
import React, {useMemo} from 'react';

const DashboardComponent = (props) => {
    const datas = [
        {
            id: 1,
            name: 'Is the select in a state of loading (async)'
        },
        {
            id: 2,
            name: 'Is the select in a state of loading (async)'
        }
    ];

    const columnHelper = createColumnHelper();

    const columns = useMemo(() => {
        return [
            columnHelper.accessor('id', {
                id: 'id',
                header: 'Id',
            }),
            columnHelper.accessor('name', {
                id: 'name',
                header: 'Name',
            }),
            columnHelper.display({
                id: 'action',
                header: 'Action',
                cell: ({row}) => {
                    return (
                        <span
                            className='fa fa-danger'
                            onClick={() => handleDeleteData(row.index)}
                        ></span>
                    );
                },
            }),
        ];
    }, [datas]);


    const table = useReactTable({
        data: datas || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {},
    });

    const handleAddData = () => {
        // const arr = datas;
        // arr.push({id: datas.length, name: 'react'});
    };

    const handleExport = () => {
        const data = [
            ['Name', 'Age', 'Email'],
            ['John', '25', 'john@example.com'],
            ['Jane', '30', 'jane@example.com'],
            ['Bob', '35', 'bob@example.com']
        ];

        const csvContent = data.map(row => row.join(',')).join('\r\n');
        const blob = new Blob([csvContent], {type: ''});
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'data.xls';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    }

    const handleDeleteData = (index) => {
        table.options.meta.removeData(index);
    };

    return (
        <div className='p-2'>
            <button onClick={handleExport} className='btn btn-success'>Export</button>
            <table className='table-bordered table-responsive table'>
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className='text-center '>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.length > 0 &&
                    table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.footer,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </tfoot>
            </table>
        </div>
    );
};

export default DashboardComponent;
