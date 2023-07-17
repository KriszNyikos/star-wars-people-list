import Link from "next/link";

export default function Pagination({
  count,
  currentPage,
  onPageChange,
}: {
  count: number;
  currentPage: number;
  onPageChange: Function;
}) {
  const pagesCount = Math.ceil(count / 10);

  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
        {
            currentPage !== 1 ?  <Link href={`/list?page=${currentPage - 1}`} key={currentPage - 1} onClick={() => onPageChange(currentPage - 1)}>prev</Link> : null
        }
       
      {pages.map((page) => {
        return (
          <Link href={`/list?page=${page}`} key={page}>
            <button onClick={() => onPageChange(page)}>
              {page}
              {page === currentPage && " (current)"}
            </button>
          </Link>
        );
      })}
      {
        currentPage !== pagesCount ? <Link href={`/list?page=${currentPage + 1}`} key={currentPage + 1} onClick={() => onPageChange(currentPage + 1)}>next</Link> : null
      }
      
    </div>
  );
}
