function ProgressBar({ progress }) {
    return (
        <div className="w-full mb-8">
            <p className="mb-2 text-sm text-gray-300">
                Progress: {progress}%
            </p>

            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                    className="bg-green-500 h-full transition-all duration-300"
                    style={{
                        width: `${progress}`,
                        background: "green",
                        height: "100%",
                        borderRadius: "10px",
                        transition: "width 0.3s ease",
                    }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;
