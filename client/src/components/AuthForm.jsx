function AuthForm ({
    isSignup,
    setIsSignUp,
    email,
    setEmail,
    password,
    setPassword,
    onLogin,
    onSignup,
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full space-y-6 max-w-md">
                <h2 className="text-2xl font-bold text-center">
                    {isSignup ? "Signup" : "Login"}
                </h2>
                    <form
                        onSubmit={isSignup ? onSignup : onLogin}
                        className="space-y-4"
                    >
                        <input
                            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input  
                            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                            type="submit"
                            >
                                {isSignup ? "Signup" : "Login"}
                            </button>
                        </form>
                    <p className="text-center">
                        {isSignup ? "Already have an account?" : "Don't have an account"}
                        <button
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                            onClick={() => setIsSignUp(!isSignup)}
                        >
                            {isSignup ? "Login" : "Signup"}
                        </button> 
                    </p>
            </div>
        </div>
    );
}

export default AuthForm;
