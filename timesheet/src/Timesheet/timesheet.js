import React from 'react';

const Timesheet = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Project</td>
            <td>Task</td>
            <td>Sun</td>
            <td>Mon</td>
            <td>Tue</td>
            <td>Wed</td>
            <td>Thurs</td>
            <td>Fri</td>
            <td>Sat</td>
            <td>Del</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>1</td>
            <td>Project1</td>
            <td>Task1</td>
            <td>0</td>
            <td>4</td>
            <td>3</td>
            <td>5</td>
            <td>3</td>
            <td>2</td>
            <td>0</td>
            <td><button>Delete</button></td>
            <td><button>Edit</button></td>
          </tr>
        </tbody>
      </table>

      <button>Exit</button>
    </div>
  );
}

export default Timesheet;
