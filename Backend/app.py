from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import json
import asyncio
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://kratijoshi.netlify.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

class Robot(BaseModel):
    robot_id: str
    online_offline: bool
    battery_percentage: int
    cpu_usage: int
    ram_consumption: int
    last_updated: str
    location_coordinates: List[float]

def convert_datetime_to_string(data):
    for robot in data:
        if isinstance(robot['last_updated'], datetime):
            robot['last_updated'] = robot['last_updated'].isoformat()
    return data

def load_fake_data():
    try:
        with open("fake_robot_data.json", "r") as file:
            data = json.load(file)
            for robot in data:
                robot['robot_id'] = robot.pop('Robot ID')
                robot['online_offline'] = robot.pop('Online/Offline')
                robot['battery_percentage'] = robot.pop('Battery Percentage')
                robot['cpu_usage'] = robot.pop('CPU Usage')
                robot['ram_consumption'] = robot.pop('RAM Consumption')
                robot['last_updated'] = datetime.strptime(robot.pop('Last Updated'), "%Y-%m-%d %H:%M:%S")
                robot['location_coordinates'] = list(robot.pop('Location Coordinates'))
            return data
    except FileNotFoundError:
        logging.error("Error: fake_robot_data.json not found.")
        return []
    except json.JSONDecodeError:
        logging.error("Error: JSON decoding error.")
        return []
    except Exception as e:
        logging.error(f"Unexpected error while loading data: {e}")
        return []

@app.get("/robots", response_model=List[Robot])
def get_robots():
    try:
        robots = load_fake_data()
        if not robots:
            raise HTTPException(status_code=404, detail="No robot data available")
        robots = convert_datetime_to_string(robots)
        return robots
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/robots")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            robots = load_fake_data()
            if not robots:
                await websocket.send_json({"error": "No robot data available"})
                break
            robots = convert_datetime_to_string(robots)
            await websocket.send_json(robots)
            await asyncio.sleep(5)
        except WebSocketDisconnect:
            logging.info("Client disconnected")
            break
        except asyncio.CancelledError:
            logging.info("Connection was canceled")
            break
        except Exception as e:
            logging.error(f"Unexpected error: {e}")
            break
