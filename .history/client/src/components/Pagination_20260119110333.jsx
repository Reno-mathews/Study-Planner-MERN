function Pagination({ currentPage, totalPages, setCurrentPage }) {
    return (
        <div className="flex gap-3 items-center justify-center mt-4">
            <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled
        </div>
    )
}