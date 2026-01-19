function LogoutButton({ onLogout }) {
return (
    <button
        className="mb-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition"
        onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        }}
    >
        Logout
    </button>
);
}

export default LogoutButton;