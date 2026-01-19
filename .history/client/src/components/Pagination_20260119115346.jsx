function Pagination({ currentPage, totalPages, setCurrentPage }) {
    return (
        <div className="flex gap-3 items-center justify-center mt-4">
            <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
        </div>
    );
}

export default Pagination;