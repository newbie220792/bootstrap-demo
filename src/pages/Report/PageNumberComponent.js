import React, {useMemo} from 'react';

const PageNumberComponent = ({pageIndex, tableInstance}) => {
    const {setPageIndex, getCanPreviousPage, previousPage, getCanNextPage, nextPage, getPageOptions} = tableInstance;
    const pageOptions = getPageOptions();

    // List of page options
    const listNumberDisplay = useMemo(() => {
        // Display full number if number of page less or equal to 7
        // Ex : 1,2,3,4,5,6,7
        if (pageOptions.length <= 6) {
            return pageOptions;
        } else if (pageOptions.length > 6) {
            let arr = [0, '...', pageOptions.length - 1];
            let arrayForm;
            let insertAt = 2;

            if (pageIndex <= 3) {
                // Current page is less than 5
                // Ex : 1,2,3,4,5 ... n
                insertAt = 1;
                arrayForm = Array.from({length: 4}, (_, idx) => idx + 1);
            } else if (pageIndex >= pageOptions.length - 4) {
                // Current page is greater than or equal to n - 4
                // Ex : 1...6,7,8,9,10
                arrayForm = Array.from({length: 4}, (_, idx) => pageOptions.length - 5 + idx);
            } else {
                // Current page is between 5 and n - 4
                // Ex : 1... 6,7,8 ...,n
                arrayForm = [pageIndex - 1, pageIndex, pageIndex + 1, '...'];
            }

            return arr.insertAt(insertAt, arrayForm);
        }
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
                            className={`paginate_button ${pageIndex === v ? 'current' : ''}`}>
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