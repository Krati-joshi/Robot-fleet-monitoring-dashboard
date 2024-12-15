# Robot Fleet Monitoring Dashboard

A real-time fleet monitoring dashboard designed to visualize the status and telemetry data of multiple robots. This project displays key robot metrics such as online/offline status, battery percentage, CPU and RAM usage, and location coordinates. It provides real-time updates and visualizes robot locations on an interactive map.

## Objective

The main goal of this project is to create an intuitive and responsive web-based dashboard to monitor and manage a fleet of robots in real-time. It uses WebSockets for real-time data updates and incorporates periodic polling to keep the telemetry data up to date. The interactive map allows users to track the robots' current positions dynamically.

## Features

- **Robot List**: Displays details for up to 10 robots with the following information:
  -
 **Robot ID (UUID)**
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

## Telemetry Data Table

The table below shows a sample of the telemetry data for the robots displayed in the dashboard:

| Robot ID (UUID)    | Status      | Battery (%) | CPU Usage (%) | RAM Consumption (%) | Location Coordinates       | Last Updated        |
|--------------------|-------------|-------------|---------------|----------------------|---------------------------|---------------------|
| 123e4567-e89b-12d3-a456-426614174000 | Online      | 95          | 30            | 45                   | (34.0522, -118.2437)      | 2024-12-14 12:45:30 |
| 123e4567-e89b-12d3-a456-426614174001 | Offline     | 0           | 0             | 0                    | (34.0522, -118.2437)      | 2024-12-14 12:45:00 |
| 123e4567-e89b-12d3-a456-426614174002 | Low Battery | 18          | 25            | 60                   | (40.7128, -74.0060)       | 2024-12-14 12:45:20 |
| 123e4567-e89b-12d3-a456-426614174003 | Online      | 78          | 45            | 70                   | (51.5074, -0.1278)        | 2024-12-14 12:45:10 |

---

Sure! Based on your project and Docker setup, here’s how you can update the **Docker Integration** section in your README file to ensure it reflects your project's Docker configuration.

---

## Docker Integration

To run the application locally using Docker, follow these steps:

### 1. **Build the Docker image**  
   First, you need to build the Docker image for both the **frontend** and **backend** parts of the application.

   - In your project root directory (where the `Dockerfile` is located), run the following command to build the Docker image:
     ```bash
     docker build -t robot-dashboard .
     ```

   This will use the Dockerfile to create the image.

### 2. **Run the Docker containers**  
   Once the image is built, you can run the application in Docker using the following command:
   ```bash
   docker run -p 8000:8000 -p 3000:3000 robot-dashboard
   ```

   This command will:
   - Map port `8000` of the container to port `8000` on your host machine for the **backend** service.
   - Map port `3000` of the container to port `3000` on your host machine for the **frontend** service.

### 3. **(Optional) Docker Compose**  
   If you're using **Docker Compose** to manage multi-container applications (both frontend and backend), you can use the following setup:

   - Create a `docker-compose.yml` file at the root of your project with the following content:

   ```yaml
   services:
     backend:
       build:
         context: ./Backend
       ports:
         - "8000:8000"
     frontend:
       build:
         context: ./Frontend
       ports:
         - "3000:3000"
   ```

   - Run the application with Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This will build both the **frontend** and **backend** images and run them in separate containers. The application will be accessible at:
   - **Frontend**: `http://localhost:3000`
   - **Backend**: `http://localhost:8000`

### 4. **Stopping the Docker Containers**  
   To stop the running containers, use the following command:
   ```bash
   docker stop $(docker ps -q)
   ```

   Alternatively, if you're using Docker Compose:
   ```bash
   docker-compose down
   ```

---

