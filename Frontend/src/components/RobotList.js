import React from "react";
import "./Layout.css";

const RobotList = ({ robots }) => {
  return (
    <div className="robot-list-container">
      <h2>Robot Telemetry Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Robot ID</th>
            <th>Status</th>
            <th>Battery %</th>
            <th>CPU Usage</th>
            <th>RAM</th>
            <th>Last Updated</th>
            <th>Coordinates</th>
          </tr>
        </thead>
        <tbody>
          {robots.map((robot) => (
            <tr
              key={robot.robot_id}
              className={robot.battery_percentage < 20 ? "highlight" : ""}
            >
              <td>{robot.robot_id}</td>
              <td>{robot.online_offline ? "Online" : "Offline"}</td>
              <td>{robot.battery_percentage}%</td>
              <td>{robot.cpu_usage}%</td>
              <td>{robot.ram_consumption} MB</td>
              <td>{new Date(robot.last_updated).toLocaleString()}</td>
              <td>{robot.location_coordinates.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RobotList;
