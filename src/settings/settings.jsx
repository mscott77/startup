import React from 'react';
import './settings.css'

export function Settings() {
  return (
    <main className="settings-page">
      <div>
        <h1>User Info</h1>
        <li><strong>Username:</strong> ladiesman217</li>
        <li><strong>Password:</strong> ******* <button>show</button></li>
      </div>
    </main>
  );
}