import Button from "./Button";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  if (pages <= 1) return null;

  return (
    <div className="mt-6 grid grid-cols-3 items-center gap-4 md:gap-8">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-full justify-center bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:text-gray-500 disabled:opacity-100"
      >
        Previous
      </Button>
      <div className="text-center text-sm font-medium text-gray-700">
        Page {page} of {pages}
      </div>
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="w-full justify-center bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:text-gray-500 disabled:opacity-100"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
