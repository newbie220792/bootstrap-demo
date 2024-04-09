import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React, {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {VocabulariesService} from "../../services/vocabulariesService";
import x from "../../assets/x-icon-new.png"
import ok from "../../assets/Ok-icon.png"
import {Image} from "react-bootstrap";

const ReportComponent = () => {

    const getReport = () => {
        return VocabulariesService.getReport().then(data => {
            if (data.status === 0) {
                return data.data;
            } else {
                return []
            }
        })
    }
    const {isPending, error, data} = useQuery({
        queryKey: ['repoData'],
        queryFn: () => getReport(),
        refetchOnMount: 'always'
    })
    const columnHelper = createColumnHelper();
    const columns = useMemo(() => {
        return [
            columnHelper.accessor('id', {
                id: 'id',
                header: 'Id',
            }),
            columnHelper.accessor('challengeDate', {
                id: 'challengeDate',
                header: 'Challenge Date',
            }),
            columnHelper.accessor('totalVocabulary', {
                id: 'totalVocabulary',
                header: 'Total Vocabulary',
                cell: ({getValue}) => getValue() === null ? '-' : getValue()
            }),
            columnHelper.accessor('numberOfSuccess', {
                id: 'numberOfSuccess',
                header: 'Number Of Success',
                cell: ({getValue}) => getValue() === null ? '-' : getValue()
            }),
            columnHelper.accessor('numberOfFailures', {
                id: 'numberOfFailures',
                header: 'Number Of Failures',
                cell: ({getValue}) => getValue() === null ? '-' : getValue()
            }),
            columnHelper.accessor('isLearningDuolingo', {
                id: 'isLearningDuolingo',
                header: 'Learning Duolingo',
                cell: ({getValue}) => getValue() === 1 ? <Image style={{width: 20}} src={ok}/> :
                    <Image style={{width: 20}} src={x}/>
            }),
            columnHelper.accessor('isLearningGrammar', {
                id: 'isLearningGrammar',
                header: 'Learning Grammar',
                cell: ({getValue}) => getValue() === 1 ? <Image style={{width: 20}} src={ok}/> :
                    <Image style={{width: 20}} src={x}/>
            }),
            columnHelper.accessor('isPracticeSpeaking', {
                id: 'isPracticeSpeaking',
                header: 'Practice Speaking',
                cell: ({getValue}) => getValue() === 1 ? <Image style={{width: 20}} src={ok}/> :
                    <Image style={{width: 20}} src={x}/>
            }),
        ];
    }, [data]);


    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {},
    });


    return <div className='p-2'>
        <h2>Report table</h2>
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
        </table>
    </div>;
};
export default ReportComponent;
