# Weather Monitoring System

This project is a **real-time weather monitoring system** built using **React** and the **OpenWeatherMap API**. The system fetches weather data for major cities in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad) and displays it in a user-friendly UI. The system provides detailed weather information, daily summaries, alerts, and visualizations.

### Development Link: [Click Here](https://weather-monitoring-system-taupe.vercel.app/)

## Features

- Real-time weather data for specified cities in India.
- Displays temperature, weather condition, humidity, wind speed, and last update time.
- Temperature alerts when the current temperature exceeds a user-defined threshold.
- Allows users to select the temperature unit (Celsius or Fahrenheit).
- Responsive design with a clean, modern UI.
- Alerts for temperature conditions that breach predefined thresholds.

## Tech Stack

- **React**: Frontend JavaScript library for building user interfaces.
- **OpenWeatherMap API**: External API to fetch real-time weather data.
- **Axios**: Promise-based HTTP client for making API calls.
- **Bootstrap**: CSS framework to style the layout and components.
- **React Icons**: For displaying weather icons such as sun, clouds, wind, humidity, etc.

## API Key

The project uses the OpenWeatherMap API to retrieve weather data. You will need an API key to use this service. If you don't have one, you can sign up for free at [OpenWeatherMap](https://openweathermap.org/).

### How to add the API key

1. After signing up on OpenWeatherMap, go to the **API Keys** section and generate a key.
2. Open the `App.js` file in the project.
3. Replace the following line with your own API key:

```js
const apiKey = "your_api_key_here";
```

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/GaneshVamsi369/Weather-Monitoring-System.git
cd weather-monitoring-system
```

### 2. Install Dependencies

Make sure you have Node.js installed. Then, in the project directory, run:

```bash
npm install
```

### 3. Start the Development Server

To run the project locally:

```bash
npm start
```

This command will start the React development server, and the application will be available at [http://localhost:3000](http://localhost:3000).




## Project Structure

```
.
├── public
│   ├── index.html           # The main HTML file
│   └── ...
├── src
│   ├── App.js               # Main React component where weather data is fetched and displayed
│   ├── App.css              # Custom styles for the application
│   ├── index.js             # Main entry point for the React app
│   └── ...
├── README.md                # Project documentation
├── package.json             # Project metadata and dependencies
└── ...
```
![Screenshot (103)](https://github.com/user-attachments/assets/e30a3549-048c-4fa1-a823-aa5eca10e35b)
![Screenshot (104)](https://github.com/user-attachments/assets/b34ddb28-92c7-4224-b32d-b3abebf9b5b9)
