type PageHandleProps = {
  pageNumber: number;
  handlePage: {
    (next: boolean): void;
    (page: number): void;
  };
};

export const PageHandle = ({ pageNumber, handlePage }: PageHandleProps) => {
  return (
    <div className="my-4 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => handlePage(false)}
        disabled={pageNumber === 1}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <input
        type="number"
        min={1}
        max={13}
        placeholder={pageNumber.toString()}
        onChange={(e) => handlePage(Number(e.target.value))}
        className="w-20 rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-semibold placeholder-black"
      />

      <button
        type="button"
        onClick={() => handlePage(true)}
        disabled={pageNumber === 13}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
