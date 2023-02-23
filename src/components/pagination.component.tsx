import { useMemo } from "react";
import ReactPaginate from "react-paginate";

export interface PaginationPageChange {
  selected: number;
}

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: ({ selected }: PaginationPageChange) => void;
}

export default function Pagination({
  total = 0,
  limit = 0,
  currentPage,
  onPageChange,
}: PaginationProps) {

  const pageCount = useMemo(() => {
    return Math.ceil(total / limit);
  }, [total, limit])

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next"
      forcePage={currentPage}
      onPageChange={onPageChange}
      pageCount={pageCount}
      previousLabel="previous"
      containerClassName="pagination"
      pageClassName="page-item"
      activeClassName="active"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      nextClassName="page-item"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
    />
  );
}
