import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token"); // Get JWT token from localStorage
            if (!token) {
                setError("Unauthorized! Please log in.");
                return;
            }

            try {
                const response = await axios.get("https://your-backend-url.com/api/user-details", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "Error fetching user details!");
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5">User Dashboard</Typography>

            {error && <Typography color="error">{error}</Typography>}

            {user && (
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Username</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default Dashboard;
