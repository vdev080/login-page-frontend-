import React, { useState, useEffect } from "react";
import { Container, Typography, List, ListItem } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("https://login-page-backend-998p.onrender.com/api/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5">Dashboard - User List</Typography>
            <List>
                {users.map(user => (
                    <ListItem key={user._id}>
                        {user.name} ({user.username}) - {user.email}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Dashboard;
