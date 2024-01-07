import { useQuery } from '@tanstack/react-query';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

const DashboardComponent = (props) => {
    const [datas, setDatas] = useState([]);
    // const datas = [];

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
                cell: ({ row }) => {
                    return (
                        <button
                            className='text-danger pointer-event '
                            type='button'
                            onClick={() => handleDeleteData(row.index)}
                        >
                            X
                        </button>
                    );
                },
            }),
        ];
    }, [datas]);

    // Queries
    const { data, refetch } = useQuery({
        queryKey: [datas.length, datas],
        queryFn: () => {
            return datas;
        },
    });

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            setDatas,
            datas,
            removeData: (rowIndex) => {
                const arr = (old) =>
                    old.filter((row, index) => index !== rowIndex);
                setDatas(arr);
            },
        },
    });

    const handleAddData = () => {
        const arr = datas;
        arr.push({ id: datas.length, name: 'react' });
        setDatas(arr);
        // refetch();
    };

    const handleDeleteData = (index) => {
        table.options.meta.removeData(index);
    };

    // console.log('re-render');
    // console.log(datas);

    // useEffect(() => {
    //     refetch();
    //     console.log('re-render');
    // }, [datas.length]);

    return (
        <div className='p-2'>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
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
            <div className='d-flex gap-3 flex-row '>
                <button onClick={handleAddData} className='border p-2'>
                    Rerender
                </button>
                <button onClick={handleDeleteData} className='border p-2'>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DashboardComponent;
