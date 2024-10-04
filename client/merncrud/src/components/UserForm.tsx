import React, { useState } from 'react';

// Define UserForm props type
interface UserFormProps {
  addUser: (newUser: { name: string, age: number, hobbies: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ addUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    hobbies: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.hobbies) {
      addUser({
        name: formData.name,
        age: Number(formData.age), // Convert to number
        hobbies: formData.hobbies
      });
      setFormData({ name: '', age: '', hobbies: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
          Age
        </label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter age"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="hobbies">
          Hobbies
        </label>
        <input
          type="text"
          name="hobbies"
          id="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter hobbies"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
      >
        Add User
      </button>
    </form>
  );
};

export default UserForm;
