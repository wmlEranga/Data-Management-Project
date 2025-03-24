import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import config from "../config";

const Dashboard = () => {
  const [farmStats, setFarmStats] = useState([]);
  const [yieldTrends, setYieldTrends] = useState([]);
  const [fertilizerUsage, setFertilizerUsage] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetch(`${config.backendUrl}/api/dashboard/farm-statistics`)
      .then((res) => res.json())
      .then((data) => setFarmStats(data));

    fetch(`${config.backendUrl}/api/dashboard/yield-trends`)
      .then((res) => res.json())
      .then((data) => setYieldTrends(data.$values));

    fetch(`${config.backendUrl}/api/dashboard/fertilizer-usage`)
      .then((res) => res.json())
      .then((data) => setFertilizerUsage(data.$values));
    fetch(`${config.backendUrl}/api/dashboard/weather`)
      .then((res) => res.json())
      .then((data) => setWeatherData(data.$values));
  }, []);

  // Inline CSS styles
  const dashboardStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const chartContainerStyle = {
    marginBottom: "40px",
    padding: "20px",
    background: "#ffffff",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
  };

  const dataForFarmStats = [
    { name: "Total Farms", value: farmStats.totalFarms },
    { name: "Recent Farms", value: farmStats.recentFarms },
  ];

  const filteredWeatherData = weatherData
    .filter((item) => item.weatherData)
    .map((item) => ({
      dateRecorded: item.weatherData.dateRecorded,
      temperature: item.weatherData.temperature,
      humidity: item.weatherData.humidity,
      rainfall: item.weatherData.rainfall,
      windSpeed: item.weatherData.windSpeed,
    }));

  return (
    <div style={dashboardStyle}>
      <h2 style={headingStyle}>Dashboard - Data Analysis</h2>

      {/* 🌱 Farm Statistics (Bar Chart) */}
      <div style={chartContainerStyle}>
        <h3>Farm Statistics by Region</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataForFarmStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📈 Yield Trends (Line Chart) */}
      <div style={chartContainerStyle}>
        <h3>Yield Trends (Last Year)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yieldTrends}>
            <XAxis dataKey="cropName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="averageYield" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🌿 Fertilizer Usage (Bar Chart) */}
      <div style={chartContainerStyle}>
        <h3>Fertilizer Usage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fertilizerUsage}>
            <XAxis dataKey="fertilizer" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="usageCount" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🌦️ Weather Analysis (Line Chart) */}
      <div style={chartContainerStyle}>
        <h3>Weather Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredWeatherData}>
            <XAxis dataKey="dateRecorded" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
            <Line type="monotone" dataKey="rainfall" stroke="#ff7300" />
            <Line type="monotone" dataKey="windSpeed" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
