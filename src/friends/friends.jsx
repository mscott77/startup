import React from 'react';
import { useNavigate } from 'react-router-dom';
import './friends.css'

export function Friends() {

  const navigate = useNavigate();

  return (
    <main className="friends-page">
      <h1>Friends</h1>
      <table className="custom-table">
        <thead/>
        <tbody>
          <tr>
            <td>Abram</td>
            <td><button>Invite</button></td>
            <td><button>Join</button></td>
          </tr>
          <tr>
            <td>Beth</td>
            <td><button>Invite</button></td>
            <td><button>Join</button></td>
          </tr>
          <tr>
            <td>Charles</td>
            <td><button>Invite</button></td>
            <td><button>Join</button></td>
          </tr>
        </tbody>
      </table>

      
      <button className='button' onClick={() => navigate("/add-friend")}>
        <strong>New Friend</strong>
      </button>

    </main>
  );
}