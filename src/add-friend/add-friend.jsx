import React from 'react';
import './add-friend.css'
import '../custom-table.css'
import '../custom-form.css'

export function AddFriend() {
  return (
    <main className="add-friend-page">
      <h1>Add Friend</h1>
        <div className="custom-form">
          <span>Username/Email</span>
          <input type="text" placeholder="friend / friend@friend.com" />
        </div>
        <button className='invite-button' type="submit">Invite</button>

      <h2>Incoming</h2>
      <table className="custom-table">
        <thead/>
        <tbody>
          <tr>
            <td>Alvin</td>
            <td><button>Accept</button></td>
            <td><button>Reject</button></td>
          </tr>
          <tr>
            <td>Chuck</td>
            <td><button>Accept</button></td>
            <td><button>Reject</button></td>
          </tr>
          <tr>
            <td>Boston</td>
            <td><button>Accept</button></td>
            <td><button>Reject</button></td>
          </tr>
        </tbody>
      </table>

      <h2>Outgoing</h2>
      <table className="custom-table">
        <tbody>
          <tr>
            <td>Dirk</td>
            <td><button>Uninvite</button></td>
            <td><button>Poke</button></td>
          </tr>
          <tr>
            <td>Ephraim</td>
            <td><button>Uninvite</button></td>
            <td><button>Poke</button></td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}