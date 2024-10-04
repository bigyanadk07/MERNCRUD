import React, { useState } from 'react';

// Define User type
interface User {
  _id: string;
  name: string;
  age: number;
  hobbies: string;
}

// Define UserList props type
interface UserListProps {
  users: User[];
  updateUser: (id: string, updatedUser: Omit<User, '_id'>) => void;
  deleteUser: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, updateUser, deleteUser }) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    age: '',
    hobbies: ''
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser._id, {
        name: editFormData.name,
        age: Number(editFormData.age),
        hobbies: editFormData.hobbies
      });
      setEditingUser(null);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <ul>
        {users.map(user => (
          <li key={user._id} className="mb-4 p-4 bg-gray-50 rounded-md">
            {editingUser && editingUser._id === user._id ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  name="age"
                  value={editFormData.age}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="hobbies"
                  value={editFormData.hobbies}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  Update
                </button>
              </form>
            ) : (
              <>
                <div className="text-lg text-gray-700">
                  <span className="font-bold">Name:</span> {user.name} |{' '}
                  <span className="font-bold">Age:</span> {user.age} |{' '}
                  <span className="font-bold">Hobbies:</span> {user.hobbies}
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 mr-2 transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
