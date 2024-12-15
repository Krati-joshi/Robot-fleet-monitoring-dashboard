# Robot Fleet Monitoring Dashboard

A real-time fleet monitoring dashboard designed to visualize the status and telemetry data of multiple robots. This project displays key robot metrics such as online/offline status, battery percentage, CPU and RAM usage, and location coordinates. It provides real-time updates and visualizes robot locations on an interactive map.

## Objective

The main goal of this project is to create an intuitive and responsive web-based dashboard to monitor and manage a fleet of robots in real-time. It uses WebSockets for real-time data updates and incorporates periodic polling to keep the telemetry data up to date. The interactive map allows users to track the robots' current positions dynamically.

## Features

- **Robot List**: Displays details for up to 10 robots with the following information:
  - **Robot ID (UUID)**
  - **Online/Offline Status**
  - **Battery Percentage**
  - **CPU Usage**
  - **RAM Consumption**
  - **Last Updated Timestamp**
  - **Location Coordinates (Latitude, Longitude)**

- **Real-Time Updates**: Provides live telemetry updates via WebSockets or polling every 5 seconds.
- **Map View**: Visualizes robot locations in real-time on a map using [Leaflet.js](https://leafletjs.com/).
- **Highlight Alerts**: 
  - **Offline Robots**
  - **Low Battery Levels** (<20%)
- **Filters**: Allows users to filter robots based on:
  - **All Robots**
  - **Online Robots**
  - **Offline Robots**
  - **Low Battery Robots**
- **Responsive Design**: The dashboard is fully optimized for desktop, tablet, and mobile devices, ensuring a seamless experience across all platforms.

## Tech Stack

### Frontend
- **React.js**: For building the interactive and responsive user interface.
- **CSS**: Styled components with a mobile-first, responsive design approach.
- **Leaflet.js**: Integrated to visualize robot locations on the map.

### Backend
- **Flask**: Simulated telemetry data for up to 10 robots.
- **WebSocket/REST API**: Endpoints for real-time updates and data fetching.
- **Mock Data**: Utilized `fake_robot_data.json` to generate mock telemetry data (battery, CPU, RAM, and location coordinates).

### Bonus Features
- **Hosting**:
  - Frontend hosted on [Netlify](https://www.netlify.com).
  - Backend hosted on [Render](https://render.com).
- **Docker**: The application is containerized using Docker to simplify deployment.

## Installation

### Prerequisites

Ensure the following tools are installed on your system:
- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **Docker** (optional for containerization)
- **Visual Studio Code (VS Code)** for an efficient development experience (recommended extensions: Prettier, ESLint, Python).

### Steps to Set Up Locally

#### Backend (Flask)

1. Open **VS Code** and navigate to the backend folder:
    ```bash
    cd backend
    ```

2. Install the required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Start the FastAPI server on port `8000`:
    ```bash
    uvicorn app:app --reload
    ```

   The backend will be available at `http://localhost:8000`.

#### Frontend (React.js)

1. Open **VS Code** and navigate to the frontend folder:
    ```bash
    cd frontend
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

   The frontend will be available at `http://localhost:3000`.

### Opening the Project in VS Code

1. Open **VS Code** and go to `File` -> `Open Folder` and select the folder containing your project.
2. If you haven't already, install the recommended extensions like **Prettier** and **ESLint** to help with code formatting and linting.
3. Open the terminal inside VS Code (`Ctrl+` ` or `Cmd+` `) and run the backend and frontend commands in separate terminal windows.

---

## How to Use

1. Open the application in your browser.
2. View the list of robots along with their real-time telemetry data.
3. Use the dropdown filter to display robots based on their status (online, offline, low battery).
4. Check the map for the real-time location of the robots.
5. Robots with **low battery** (<20%) or **offline** status will be highlighted for easy identification.

---

## API Endpoints

### REST Endpoints

- **GET /robots**: Fetches the list of all robots and their current telemetry data.

### WebSocket Endpoints

- **WS /ws/robots**: Provides real-time telemetry updates for all robots.

---

## Deployment

### Frontend Deployment

The frontend is deployed on **Netlify**:  
**URL**: [Frontend Deployment](https://kratijoshi.netlify.app/)

### Backend Deployment

The backend is deployed on **Render**:  
**URL**: [Backend Deployment](https://robot-fleet-monitoring-dashboard-j065.onrender.com)

---

## Docker Integration

To run the **Robot Fleet Monitoring Dashboard** locally using Docker, follow the steps below:

### Prerequisites

Ensure that Docker is installed on your system. If you don't have Docker installed, follow the installation guide from [Docker's official site](https://www.docker.com/get-started).

### Steps for Running Locally

1. **Clone the Repository** (if you haven’t already):
   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. **Create Dockerfiles** (if not already created for both frontend and backend):

   #### Backend Dockerfile (`backend/Dockerfile`)

   ```Dockerfile
   FROM python:3.8-slim
   WORKDIR /app
   COPY requirements.txt /app/
   RUN pip install --no-cache-dir -r requirements.txt
   COPY . /app/
   EXPOSE 8000
   CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
   ```

   #### Frontend Dockerfile (`frontend/Dockerfile`)

   ```Dockerfile
   FROM node:16
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . /app/
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

3. **Create a Docker Compose File** (`docker-compose.yml`):

   ```yaml
   version: '3.8'

   services:
     backend:
       build:
         context: ./backend
       ports:
         - "8000:8000"
       environment:
         - PYTHONUNBUFFERED=1
       volumes:
         - ./backend:/app
       depends_on:
         - db

     frontend:
       build:
         context: ./frontend
       ports:
         - "3000:3000"
       environment:
         - REACT_APP_API_URL=http://backend:8000
       volumes:
         - ./frontend:/app
       depends_on:
         - backend

     db:
       image: postgres:13
       environment:
         POSTGRES_USER: user
         POSTGRES_PASSWORD: password
         POSTGRES_DB: robot_db
       volumes:
         - ./data/db:/var/lib/postgresql/data
       ports:
         - "5432:5432"
   ```

4. **Build and Start Containers**:

   After creating the necessary Dockerfiles and the `docker-compose.yml` file, use the following commands to build and start both containers (frontend, backend, and database):

   ```bash
   docker-compose up --build
   ```

5. **Access the Application**:

   - The **frontend** will be accessible at [http://localhost:3000](http://localhost:3000).
   - The **backend** (API server) will be accessible at [http://localhost:8000](http://localhost:8000).

### Stopping the Containers

To stop the containers after you are done, use:

```bash
docker-compose down
```

This will stop and remove all the containers, networks, and volumes created by `docker-compose`.

---

## Telemetry Data Table

The table below shows a sample of the telemetry data for the robots displayed in the dashboard:

| Robot ID (UUID)    | Status      | Battery (%) | CPU Usage (%) | RAM Consumption (%) | Location Coordinates       | Last Updated          |
|--------------------|-------------|-------------|---------------|----------------------|----------------------------|-----------------------|
| 3b6b3e99-2d64-4a33 | Online      | 85          | 34            | 58                   | (25.276987, 55.296249)      | 2024-12-15 12:34:56   |
| 39fa663d-02f0-4a07 | Offline     | 10          | 90            | 72                   | (25.276987, 55.296249)      | 2024-12-15 12:34:56   |
| 2f828b3f-2d56-4c29 | Low Battery | 18          | 50            | 45                   | (25.276987, 55.296249)      | 2024-12-15 12:

34:56   |

---


