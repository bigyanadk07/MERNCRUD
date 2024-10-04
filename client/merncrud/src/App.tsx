import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

// Define User type
interface User {
  _id: string;
  name: string;
  age: number;
  hobbies: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const addUser = async (newUser: Omit<User, '_id'>) => {
    try {
      const response = await axios.post('http://localhost:5000/users', newUser);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  const updateUser = async (id: string, updatedUser: Omit<User, '_id'>) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, updatedUser);
      setUsers(users.map(user => user._id === id ? response.data : user));
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">User Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New User</h2>
            <UserForm addUser={addUser} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">User List</h2>
            <UserList users={users} updateUser={updateUser} deleteUser={deleteUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
