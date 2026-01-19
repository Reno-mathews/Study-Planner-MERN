function AuthForm ({
    isSignup,
    setIsSignUp,
    email,
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

                    <form
                        onSubmit={isSignup ? onSignup : onLogin}
                        className="space-y-4"
                    >
                        <input
                            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            placeholder="email"
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
                            
                    </form>
                </h2>
            </div>
        </div>
    )
}