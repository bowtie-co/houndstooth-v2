import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export const AppPagination = ({items, page = 1, perPage = 10, maxPages, disableLast = false, setPage}) => {

  const [ pageCount, setPageCount ] = useState(0);
  const [ pageNumbers, setPageNumbers ] = useState([]);

  const getPages = (max, start = 1) => {
    const pages = [];
    for (let i = start; i <= max; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    if (page > pageCount) {
      setPage(1);
    }

    items && setPageCount(Math.ceil(items.length / perPage));

    if (maxPages) {
      let i;
      const half = Math.ceil(maxPages / 2);
      if (page <= half) {
        i = 0;
      } else if (page >= pageCount - 2) {
        i = pageCount - maxPages;
      } else {
        i = page - half;
      }
      setPageNumbers(getPages(pageCount).slice(i, i + maxPages));
    } else {
      setPageNumbers(getPages(pageCount));
    }
  }, [ items, page, setPage, pageCount, perPage, maxPages ]);

  const handlePage = (e) => {
    setPage(e);
  };

  return (
    <Pagination size={'sm'} className='pagination'>
      <PaginationItem disabled={page <= 1}>
        <PaginationLink first onClick={(e) => handlePage(1)} />
      </PaginationItem>
      <PaginationItem disabled={page <= 1}>
        <PaginationLink previous onClick={(e) => handlePage(page - 1)} />
      </PaginationItem>

      {pageNumbers.map(num => (
        <PaginationItem key={`paginate-${num}`} active={page === parseInt(num)}>
          <PaginationLink onClick={(e) => handlePage(num)}>
            {num}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={page >= pageCount}>
        <PaginationLink next onClick={(e) => handlePage(page + 1)} />
      </PaginationItem>
      <PaginationItem disabled={disableLast || page >= pageCount}>
        <PaginationLink last onClick={(e) => handlePage(pageCount)} />
      </PaginationItem>
    </Pagination>
  );
};