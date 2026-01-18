function SearchBar({ searchQuery, setSearchQuery }) {
    return (
    <input
        type="text"
        placeholder="Search tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:right-2 focus:ring-blue-500"
        />
    );
}

export default SearchBar;
