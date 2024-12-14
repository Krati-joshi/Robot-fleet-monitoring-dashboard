import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './mapStyles.css';

const createIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://cdn-icons-png.flaticon.com/512/684/684908.png`,
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -40],
    className: `custom-icon-${color}`,
  });
};

function MapComponent({ robots }) {
  const [center, setCenter] = useState([51.505, -0.09]);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    if (robots.length > 0) {
      const latitudes = robots.map(robot => robot.location_coordinates[0]);
      const longitudes = robots.map(robot => robot.location_coordinates[1]);

      setCenter([ 
        (Math.min(...latitudes) + Math.max(...latitudes)) / 2, 
        (Math.min(...longitudes) + Math.max(...longitudes)) / 2 
      ]);
      setZoom(robots.length > 1 ? 5 : 10);
    }
  }, [robots]);

  return (
    <div className="container">
      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={zoom}
          className="mapStyle"
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {robots.map((robot) => {
            const isLowBattery = robot.battery_percentage < 20;
            const isOffline = !robot.online_offline;
            let markerColor = "blue";
            if (isOffline) markerColor = "gray";
            else if (isLowBattery) markerColor = "red";
            const [lat, lon] = robot.location_coordinates;
            if (!lat || !lon) return null; 
            const icon = createIcon(markerColor);

            return (
              <Marker key={robot.robot_id} position={[lat, lon]} icon={icon}>
                <Popup>
                  <div>
                    <div className="boxStyle">
                      <span className="labelStyle">Robot ID:</span>
                      <span className="valueStyle">{robot.robot_id}</span>
                    </div>

                    <div className="boxStyle">
                      <span className="labelStyle">Status:</span>
                      <span className="valueStyle">
                        {robot.online_offline ? "Online" : "Offline"}
                      </span>
                    </div>

                    <div className="boxStyle">
                      <span className="labelStyle">Battery:</span>
                      <span className="valueStyle">{robot.battery_percentage}%</span>
                    </div>

                    <div className="boxStyle">
                      <span className="labelStyle">CPU Usage:</span>
                      <span className="valueStyle">{robot.cpu_usage}%</span>
                    </div>

                    <div className="boxStyle">
                      <span className="labelStyle">RAM Consumption:</span>
                      <span className="valueStyle">{robot.ram_consumption} MB</span>
                    </div>

                    <div className="boxStyle">
                      <span className="labelStyle">Last Updated:</span>
                      <span className="valueStyle">
                        {new Date(robot.last_updated).toLocaleString()}
                      </span>
                    </div>

                    <div className="boxStyle">
                      <span className="labelStyle">Location:</span>
                      <span className="valueStyle">
                        {robot.location_coordinates.join(", ")}
                      </span>
                    </div>
                    
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComponent;
