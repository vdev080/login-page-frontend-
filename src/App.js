import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
    const [page, setPage] = useState("login");
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            setPage("dashboard");
        }
    }, []);

    return (
        <>
            {page === "register" && <Register onRegister={() => setPage("login")} />}
            {page === "login" && <Login onLogin={(token) => {
                localStorage.setItem("token", token);
                setToken(token);
                setPage("dashboard");
            }} />}
            {page === "dashboard" && token ? <Dashboard /> : <Login onLogin={(token) => {
                localStorage.setItem("token", token);
                setToken(token);
                setPage("dashboard");
            }} />}
        </>
    );
}

export default App;
