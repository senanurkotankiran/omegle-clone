// components/UserInfo.tsx
"use client"
import React, { useState, useEffect } from 'react';

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/user/me');
      const data = await response.json();
      setUser(data.user);
    };

    fetchData();
  }, []);

  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
};

export default UserInfo;
