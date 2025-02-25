import React from 'react';
import './scores.css'



export function Scores() {
  return (
    <main className="scores-page">
      <h1>Scores</h1>
      
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Abram</td>
            <td>2:43</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Beth</td>
            <td>4:21</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Chrysanthemum</td>
            <td>5:08</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}