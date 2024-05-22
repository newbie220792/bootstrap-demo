import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import React, {useMemo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {VocabulariesService} from '../../services/vocabulariesService';
import x from '../../assets/x-icon-new.png';
import ok from '../../assets/Ok-icon.png';
import {Image} from 'react-bootstrap';
import moment from 'moment';
import PageNumberComponent from './PageNumberComponent';
import {HttpStatus} from '../../common/HttpStatus';

const ReportComponent = () => {
    const [{pageIndex, pageSize}, setPagination] = useState({pageIndex: 0, pageSize: 10});
    const pagination = {pageIndex, pageSize};
    const [totalRecords, setTotalRecords] = useState(0);
    const getReport = () => {
        return VocabulariesService.getReport().then(data => {
            if (data.status === HttpStatus.SUCCESS) {
                setTotalRecords(data.data.length);
                return data.data;
            } else {
                return [];
            }
        });
    };

    const formatDate = (date) => {
        return moment(new Date(date)).format('DD/MM/yyyy');
    };
    const {isPending, error, data} = useQuery({
        queryKey: ['repoData'],
        queryFn: () => getReport(),
        refetchOnMount: 'always'
    });
    const columnHelper = createColumnHelper();
    const columns = useMemo(() => {
        return [
            columnHelper.accessor('index', {
                id: 'index',
                header: 'Index',
                cell: ({row}) => row.index + 1
            }),
            columnHelper.accessor('challengeDate', {
                id: 'challengeDate',
                header: 'Challenge Date',
                cell: ({getValue}) => formatDate(getValue())
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
            columnHelper.accessor('isLearningVocabulary', {
                id: 'isLearningVocabulary',
                header: 'Learning Vocabulary',
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
        state: {
            pagination,
        },
        pageCount: Math.ceil(totalRecords / pageSize) || -1,
        getCoreRowModel: getCoreRowModel(),
        meta: {},
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
    });

    return <div className="mt-4 d-flex flex-row justify-content-center align-items-center">
        <table className="table-bordered table-responsive table">
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th key={header.id} className="text-center ">
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
        <div className={'table-pagination'}>
            <PageNumberComponent tableInstance={table} pageIndex={pageIndex}/>
        </div>
    </div>;
};
export default ReportComponent;
