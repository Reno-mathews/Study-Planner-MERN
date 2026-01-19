function SubjectrFilter({ subjects, filterSubject, setFilterSubject }) {
    return (
        <select 
            className="w-full bg-gray-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
        >
            {subjects.map((subj, index) => (
                <option key={index} value={subj}>
                    {subj}
                </option>
            ))}
        </select>
    );
}

export default SubjectFilter;