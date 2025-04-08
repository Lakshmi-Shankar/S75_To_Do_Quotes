import React, { useState, useEffect } from "react";

const Dropdown = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    // Fetch users
    useEffect(() => {
        fetch("http://localhost:3000/api") // ✅ Correct users API
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data)) throw new Error("Invalid response");
                setUsers(data);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setError("Failed to load users");
            });
    }, []);

    // Fetch tasks for selected user
    useEffect(() => {
        if (!selectedUser || selectedUser.length !== 24) { 
            setTasks([]);
            return;
        }
    
        fetch(`http://localhost:3000/api/tasks?created_by=${selectedUser}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch tasks");
                return res.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) throw new Error("Invalid response format");
                setTasks(data);
                setError("");
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
                setError(err.message || "Failed to fetch tasks");
                setTasks([]);
            });
    }, [selectedUser]);

    return (
        <div className='container'>
            <h2>Task Management</h2>
            
            <label>Select a User:</label>
            <select onChange={(e) => setSelectedUser(e.target.value)} className='dropdown'>
                <option value="">-- Select User --</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>
            
            {error && <p className='error'>{error}</p>}
            <h3>Tasks by {selectedUser ? users.find(u => u._id === selectedUser)?.name || "User" : "User"}</h3>
            <ul className='taskList'>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task._id} className='taskItem'>{task.title} - {task.status}</li>
                    ))
                ) : (
                    <p>No tasks found.</p>
                )}
            </ul>

            <style>{`
                .container {
                    background: linear-gradient(135deg, #ff9a9e, #fad0c4);
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    color: #333;
                    max-width: 500px;
                    margin: auto;
                    transition: transform 0.3s ease-in-out;
                }
                .container:hover {
                    transform: scale(1.02);
                }
                .dropdown {
                    padding: 10px;
                    font-size: 16px;
                    border-radius: 8px;
                    border: none;
                    background: white;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s;
                }
                .dropdown:focus {
                    outline: none;
                    transform: scale(1.05);
                }
                .error {
                    color: red;
                    font-weight: bold;
                }
                .taskList {
                    list-style: none;
                    padding: 0;
                    margin: 15px 0;
                }
                .taskItem {
                    background: linear-gradient(135deg, #56ccf2, #2f80ed);
                    padding: 10px;
                    margin: 5px 0;
                    border-radius: 8px;
                    color: white;
                    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
                    font-weight: bold;
                    transition: transform 0.3s ease-in-out;
                }
                .taskItem:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default Dropdown;