import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RobotList from "./components/RobotList";
import MapComponent from "./components/MapComponent";
import "./App.css";
import axios from "axios";

const App = () => {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await axios.get("http://localhost:8000/robots");
        setRobots(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch robot data");
        console.error(err);
        setLoading(false);
      }
    };

    fetchRobots();
  }, []);

  useEffect(() => {
    let retries = 0;
    let reconnectInterval;

    const connectWebSocket = () => {
      const socket = new WebSocket("ws://localhost:8000/ws/robots");

      socket.onopen = () => {
        console.log("Connected to WebSocket server");
        setError(null);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received data from WebSocket:", data);

        setRobots((prevRobots) => {
          const updatedRobots = prevRobots.map((robot) => {
            const updatedRobot = data.find((r) => r.robot_id === robot.robot_id);
            return updatedRobot ? { ...robot, ...updatedRobot } : robot;
          });
          return [
            ...updatedRobots,
            ...data.filter((r) => !prevRobots.find((robot) => robot.robot_id === r.robot_id)),
          ];
        });
      };

      socket.onclose = (event) => {
        console.log("Disconnected from WebSocket server", event);
        if (!event.wasClean) {
          console.log("WebSocket closed unexpectedly, attempting to reconnect...");
          retries++;
          reconnectInterval = setTimeout(() => {
            connectWebSocket();
          }, Math.min(5000 * retries, 30000));
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error", error);
        setError("WebSocket connection error");
        setLoading(false);
      };

      setSocket(socket);
    };

    if (!socket) {
      connectWebSocket();
    }

    return () => {
      if (socket) {
        socket.close();
      }
      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
    };
  }, [socket]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <div className="map-panel">
          <MapComponent robots={robots.filter((robot) => {
            if (filter === "low-battery") return robot.battery_percentage < 20;
            if (filter === "online") return robot.online_offline;
            if (filter === "offline") return !robot.online_offline;
            return true;
          })} />
        </div>
        <div className="list-panel">
          <div className="filter-container">
            <label>Filters</label>
            <select
              className="filter-select"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="all">All Robots</option>
              <option value="low-battery">Low Battery (&lt;20%)</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <RobotList robots={robots.filter((robot) => {
            if (filter === "low-battery") return robot.battery_percentage < 20;
            if (filter === "online") return robot.online_offline;
            if (filter === "offline") return !robot.online_offline;
            return true;
          })} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
