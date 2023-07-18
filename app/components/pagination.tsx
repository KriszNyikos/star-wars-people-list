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
        <button
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        >
          prev
        </button>
      }

      {pages.map((page) => {
        return (
          <button
            key={page}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ${
              page === currentPage && "bg-gray-400"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
      {
        <button
          disabled={currentPage === pagesCount}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        >
          next
        </button>
      }
    </div>
  );
}
