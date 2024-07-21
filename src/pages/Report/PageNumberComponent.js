import React, {useMemo} from 'react';

const PageNumberComponent = ({pageIndex, tableInstance}) => {
    const {setPageIndex, getCanPreviousPage, previousPage, getCanNextPage, nextPage, getPageOptions} = tableInstance;
    const pageOptions = getPageOptions();

    // List of page options
    const listNumberDisplay = useMemo(() => {
        // Display full number if number of page less or equal to 7
        // Ex : 1,2,3,4,5,6,7
        return pageOptions;
    }, [pageOptions, pageIndex]);

    const goToPage = (index) => () => setPageIndex(index);

    return (
        <div className='dataTables_paginate paging_full_numbers'>
            <a className='paginate_button' onClick={goToPage(0)} hidden={!getCanPreviousPage()}>
                <i className='fa fa-angle-double-left'/>
            </a>
            <a className='paginate_button' onClick={() => previousPage()} hidden={!getCanPreviousPage()}>
                <i className='fa fa-angle-left'/>
            </a>
            <span className='page-number'>
                {listNumberDisplay.map((v, idx) =>
                    !isNaN(v) ? (
                        <a
                            key={`pagination-${v}`}
                            onClick={goToPage(v)}
                            className={`paginate_button btn btn-outline-info pe-auto me-2 ${pageIndex === v ? 'current' : ''}`}>
                            {v + 1}
                        </a>
                    ) : (
                        <span key={`pagination-ellipsis-${idx}`} className='ellipsis'>
                            {v}
                        </span>
                    )
                )}
            </span>
            <a className='paginate_button' onClick={() => nextPage()} hidden={!getCanNextPage()}>
                <i className='fa fa-angle-right'/>
            </a>
            <a className='paginate_button' onClick={goToPage(pageOptions.length - 1)} hidden={!getCanNextPage()}>
                <i className='fa fa-angle-double-right'/>
            </a>
        </div>
    );
};

export default PageNumberComponent;