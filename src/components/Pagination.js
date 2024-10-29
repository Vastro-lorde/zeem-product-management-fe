export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border text-gray-600 font-bold uppercase rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <p className="text-gray-600 font-bold">
                Page {currentPage} of {totalPages}
            </p>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border text-gray-600 font-bold uppercase rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}