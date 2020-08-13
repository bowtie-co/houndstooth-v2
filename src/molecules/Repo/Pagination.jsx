import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export const RepoPagination = (props) => {
  const { repoPages, setRepoPage } = props;

  const [ page, setPage ] = useState(1);
  const [ pageNumbers, setPageNumbers ] = useState(Object.keys(repoPages).slice(0, 5));
  const [ end, setEnd ] = useState(pageNumbers.length);
  const [ prev, setPrev ] = useState(null);
  const [ next, setNext ] = useState(null);
  const start = 1;

  useEffect(() => {
    setEnd(Object.keys(repoPages).length);
  }, [ repoPages ]);

  useEffect(() => {
    let i;
    if (page <= 3) {
      i = 0;
    } else if (page >= end - 2) {
      i = end - 5;
    } else {
      i = page - 3;
    }
    setPageNumbers(Object.keys(repoPages).slice(i, i + 5));
    setPrev(page !== start ? page - 1 : null);
    setNext(page !== end ? page + 1 : null);
  }, [ page, end, repoPages ]);

  const handlePage = (e) => {
    setPage(parseInt(e));
    setRepoPage(repoPages[e]);
  };

  return (
    <Pagination size={'sm'} className='pagination'>
      <PaginationItem disabled={page <= start}>
        <PaginationLink disabled={page <= start} first onClick={(e) => handlePage(start)} />
      </PaginationItem>
      <PaginationItem disabled={page <= start}>
        <PaginationLink disabled={page <= start} previous onClick={(e) => handlePage(prev)} />
      </PaginationItem>

      {pageNumbers.map(num => (
        <PaginationItem key={`paginate-${num}`} active={page === parseInt(num)}>
          <PaginationLink onClick={(e) => handlePage(num)}>
            {num}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={page >= end}>
        <PaginationLink disabled={page >= end} next onClick={(e) => handlePage(next)} />
      </PaginationItem>
      <PaginationItem disabled={page >= end}>
        <PaginationLink disabled={page >= end} last onClick={(e) => handlePage(end)} />
      </PaginationItem>
    </Pagination>
  );
};