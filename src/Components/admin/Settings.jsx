import React, { useState } from 'react';
import { auth } from '../../firebase';
import { updatePassword, updateEmail } from 'firebase/auth';

const Settings = () => {
  const [email, setEmail] = useState(auth.currentUser?.email || '');
  const [password, setPassword] = useState('');

  const handleEmailUpdate = async () => {
    const user = auth.currentUser;
    await updateEmail(user, email);
    alert('Email updated successfully');
  };

  const handlePasswordUpdate = async () => {
    const user = auth.currentUser;
    await updatePassword(user, password);
    alert('Password updated successfully');
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Settings</h2>
      <div className="mb-2">
        <label>Update Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <button onClick={handleEmailUpdate} className="bg-blue-500 text-white p-2 mt-2">Update Email</button>
      </div>
      <div className="mb-2">
        <label>Update Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button onClick={handlePasswordUpdate} className="bg-blue-500 text-white p-2 mt-2">Update Password</button>
      </div>
    </div>
  );
};

export default Settings;