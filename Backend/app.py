from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import json
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://kratijoshi.netlify.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
        print("Error: fake_robot_data.json not found.")
        return []
    except json.JSONDecodeError:
        print("Error: JSON decoding error.")
        return []

@app.get("/robots", response_model=List[Robot])
def get_robots():
    robots = load_fake_data()
    robots = convert_datetime_to_string(robots)
    return robots

@app.websocket("/ws/robots")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            robots = load_fake_data()
            robots = convert_datetime_to_string(robots)
            await websocket.send_json(robots)
            await asyncio.sleep(5)
        except WebSocketDisconnect:
            print("Client disconnected")
            break
        except asyncio.CancelledError:
            print("Connection was canceled")
            break
        except Exception as e:
            print(f"Unexpected error: {e}")
            break
