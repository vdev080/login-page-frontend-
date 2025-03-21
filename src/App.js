import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
    const [page, setPage] = useState("register"); 

    return (
        <>
            {page === "register" && <Register onRegister={() => setPage("login")} />}
            {page === "login" && <Login onLogin={() => setPage("dashboard")} />}
            {page === "dashboard" && <Dashboard />}
        </>
    );
}

export default App;
