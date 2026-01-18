function SortDropdown({ sortType, setSortType }) {
    return (
        <select 
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="az">Title: A → Z</option>
            <option value="za">Title: Z → A</option>
        </select>
    );
}

export default SortDropdown;
