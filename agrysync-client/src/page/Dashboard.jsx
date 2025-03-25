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
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
  ZAxis,
  CartesianGrid,
} from "recharts";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Slider,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  Timeline,
  Opacity,
  Thermostat,
  NavigateBefore,
  NavigateNext,
  Spa,
  WaterDrop,
  FilterVintage,
  LocalFlorist,
  BugReport,
  Person,
  CalendarToday,
} from "@mui/icons-material";
import config from "../config";

const Dashboard = () => {
  const [farmStats, setFarmStats] = useState([]);
  const [yieldTrends, setYieldTrends] = useState([]);
  const [fertilizerUsage, setFertilizerUsage] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [cropDistribution, setCropDistribution] = useState([]);
  const [seasonalYield, setSeasonalYield] = useState([]);
  const [irrigationEfficiency, setIrrigationEfficiency] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [seasonYieldCount, setSeasonYieldCount] = useState([]);
  const [cropSuccessRate, setCropSuccessRate] = useState([]);
  const [diseasePrevalence, setDiseasePrevalence] = useState([]);
  const [farmerProductivity, setFarmerProductivity] = useState([]);

  // Number of chart sets to display (we'll have 3 sets of charts)
  const totalSlides = 3;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const farmStatsResponse = await fetch(
          `${config.backendUrl}/api/dashboard/farm-statistics`
        );
        const yieldTrendsResponse = await fetch(
          `${config.backendUrl}/api/dashboard/yield-trends`
        );
        const fertilizerUsageResponse = await fetch(
          `${config.backendUrl}/api/dashboard/fertilizer-usage`
        );
        const weatherDataResponse = await fetch(
          `${config.backendUrl}/api/dashboard/weather`
        );
        const cropDistributionResponse = await fetch(
          `${config.backendUrl}/api/farmerdashboard/crop-distribution`
        );
        const seasonalYieldResponse = await fetch(
          `${config.backendUrl}/api/farmerdashboard/seasonal-yield`
        );
        const seasonYieldCountResponse = await fetch(
          `${config.backendUrl}/api/farmerdashboard/season-yield-count`
        );
        const cropSuccessRateResponse = await fetch(
          `${config.backendUrl}/api/farmerdashboard/crop-success-rate`
        );

        const farmerProductivityResponse = await fetch(
          `${config.backendUrl}/api/farmerdashboard/farmer-productivity`
        );

        const farmStatsData = await farmStatsResponse.json();
        const yieldTrendsData = await yieldTrendsResponse.json();
        const fertilizerUsageData = await fertilizerUsageResponse.json();
        const weatherDataData = await weatherDataResponse.json();
        const cropDistributionData = await cropDistributionResponse.json();
        const seasonalYieldData = await seasonalYieldResponse.json();
        const seasonYieldCountData = await seasonYieldCountResponse.json();
        const cropSuccessRateData = await cropSuccessRateResponse.json();

        const farmerProductivityData = await farmerProductivityResponse.json();

        setFarmStats(farmStatsData);
        setYieldTrends(yieldTrendsData.$values);
        setFertilizerUsage(fertilizerUsageData.$values);
        setWeatherData(weatherDataData.$values);
        setCropDistribution(cropDistributionData.$values || []);
        setSeasonalYield(seasonalYieldData.$values || []);
        setSeasonYieldCount(seasonYieldCountData.$values || []);
        setCropSuccessRate(cropSuccessRateData.$values || []);

        setFarmerProductivity(farmerProductivityData.$values || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle slide navigation
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const dataForFarmStats = [
    { name: "Total Farms", value: farmStats.totalFarms },
    { name: "Recent Farms", value: farmStats.recentFarms },
  ];

  const processedWeatherData = weatherData.map((item) => ({
    dateRecorded: new Date(item.dateRecorded).toLocaleDateString(),
    temperature: item.averageTemperature,
    humidity: item.averageHumidity,
    rainfall: item.averageRainfall,
    windSpeed: item.averageWindSpeed,
  }));

  const chartOptions = {
    style: {
      fontSize: "12px",
    },
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
  ];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <LinearProgress
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "rgba(91,134,229,0.1)",
            "& .MuiLinearProgress-bar": {
              background: "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
            },
          }}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: "#2d4470",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: 0,
            width: "60px",
            height: "4px",
            background: "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
            borderRadius: "2px",
          },
        }}
      >
        Dashboard Analytics
      </Typography>

      {/* Slider Navigation */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={handlePrevSlide} color="primary">
          <NavigateBefore fontSize="large" />
        </IconButton>

        <Slider
          value={currentSlide}
          step={1}
          marks
          min={0}
          max={totalSlides - 1}
          valueLabelDisplay="off"
          sx={{
            mx: 2,
            width: "200px",
            "& .MuiSlider-thumb": {
              bgcolor: "#5B86E5",
              width: 16,
              height: 16,
            },
            "& .MuiSlider-track": {
              background: "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
            },
          }}
          onChange={(e, newValue) => setCurrentSlide(newValue)}
        />

        <IconButton onClick={handleNextSlide} color="primary">
          <NavigateNext fontSize="large" />
        </IconButton>
      </Box>

      {/* First set of charts - visible when currentSlide is 0 */}
      <Grid
        container
        spacing={4}
        sx={{ display: currentSlide === 0 ? "flex" : "none" }}
      >
        {/* Existing charts */}
        {/* 🌱 Farm Statistics (Bar Chart) */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <BarChartIcon />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Farm Statistics by Region
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataForFarmStats}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis dataKey="name" tick={chartOptions.style} />
                    <YAxis tick={chartOptions.style} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="value"
                      fill="#5B86E5"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 📈 Yield Trends (Line Chart) */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <Timeline />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Yield Trends (Last Year)
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={yieldTrends}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis dataKey="cropName" tick={chartOptions.style} />
                    <YAxis tick={chartOptions.style} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Line
                      type="monotone"
                      dataKey="averageYield"
                      stroke="#36D1DC"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 🌿 Fertilizer Usage (Bar Chart) */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <Opacity />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Fertilizer Usage
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={fertilizerUsage}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis dataKey="fertilizer" tick={chartOptions.style} />
                    <YAxis tick={chartOptions.style} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="usageCount"
                      fill="#7E57C2"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 🌦️ Weather Analysis (Line Chart) - Title updated to reflect average data */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <Thermostat />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Average Weather Conditions
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={processedWeatherData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis dataKey="dateRecorded" tick={chartOptions.style} />
                    <YAxis tick={chartOptions.style} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      name="Avg Temperature"
                      stroke="#FF5722"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      name="Avg Humidity"
                      stroke="#2196F3"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                    <Line
                      type="monotone"
                      dataKey="rainfall"
                      name="Avg Rainfall"
                      stroke="#4CAF50"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                      animationBegin={600}
                    />
                    <Line
                      type="monotone"
                      dataKey="windSpeed"
                      name="Avg Wind Speed"
                      stroke="#9C27B0"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                      animationBegin={900}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Second set of charts - visible when currentSlide is 1 */}
      <Grid
        container
        spacing={4}
        sx={{ display: currentSlide === 1 ? "flex" : "none" }}
      >
        {/* 🌾 Crop Distribution by Area */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <FilterVintage />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Crop Distribution by Area
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={cropDistribution}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis dataKey="cropType" tick={chartOptions.style} />
                    <YAxis tick={chartOptions.style} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="totalArea"
                      name="Total Area"
                      fill="#4CAF50"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                    <Bar
                      dataKey="fieldCount"
                      name="Field Count"
                      fill="#8BC34A"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 🌱 Season Yield Count (replace the empty grid item) */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <Spa />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Yield Count by Season
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={seasonYieldCount}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis dataKey="season" tick={chartOptions.style} />
                    <YAxis tick={chartOptions.style} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                      formatter={(value, name) => [
                        value,
                        name === "yieldCount" ? "Yield Count" : "Total Yield",
                      ]}
                      labelFormatter={(label) => `Season: ${label}`}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="yieldCount"
                      name="Yield Count"
                      fill="#FF9800"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                    <Bar
                      dataKey="totalYield"
                      name="Total Yield"
                      fill="#FFC107"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Third set of charts - visible when currentSlide is 2 */}
      <Grid
        container
        spacing={4}
        sx={{ display: currentSlide === 2 ? "flex" : "none" }}
      >
        {/* 🌱 Crop Success Rate */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <LocalFlorist />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Crop Success Rate
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropSuccessRate}
                      dataKey="successRate"
                      nameKey="cropType"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={true}
                      label={({ cropType, successRate }) =>
                        `${cropType}: ${successRate.toFixed(1)}%`
                      }
                    >
                      {cropSuccessRate.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [
                        `${value.toFixed(2)}%`,
                        `Success Rate`,
                      ]}
                      labelFormatter={(label, payload) =>
                        `Crop: ${payload[0]?.cropType}`
                      }
                    />
                    <Legend
                      formatter={(value, entry) => entry.payload.cropType}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 🐛 Disease Prevalence
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <BugReport />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Disease Prevalence by Crop
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={diseasePrevalence}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <XAxis
                      dataKey="diseaseName"
                      tick={chartOptions.style}
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis tick={chartOptions.style} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                      formatter={(value, name) => [
                        name === "occurrenceCount"
                          ? value
                          : `${value.toFixed(1)}%`,
                        name === "occurrenceCount"
                          ? "Occurrences"
                          : "Treatment Success",
                      ]}
                      labelFormatter={(label) =>
                        `${label} (${
                          diseasePrevalence.find(
                            (item) => item.diseaseName === label
                          )?.cropType
                        })`
                      }
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="occurrenceCount"
                      name="Occurrences"
                      fill="#e57373"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                    <Bar
                      dataKey="treatmentSuccess"
                      name="Treatment Success Rate"
                      fill="#81c784"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}

        {/* 👨‍🌾 Farmer Productivity Comparison */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <Person />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Farmer Productivity Comparison
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="totalArea"
                      name="Total Area"
                      unit=" acres"
                      tick={chartOptions.style}
                    />
                    <YAxis
                      dataKey="averageYield"
                      name="Average Yield"
                      unit=" kg"
                      tick={chartOptions.style}
                    />
                    <ZAxis
                      dataKey="totalCrops"
                      range={[50, 400]}
                      name="Total Crops"
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      formatter={(value, name) => [
                        `${value}${
                          name.includes("Area")
                            ? " acres"
                            : name.includes("Yield")
                            ? " kg"
                            : ""
                        }`,
                        name,
                      ]}
                      labelFormatter={(label) =>
                        farmerProductivity.find(
                          (item) => item.totalArea === label
                        )?.farmerName
                      }
                    />
                    <Legend />
                    <Scatter
                      name="Farmers"
                      data={farmerProductivity}
                      fill="#8884d8"
                      shape="circle"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Season-based Planting Calendar */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(91,134,229,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
                  }}
                >
                  <CalendarToday />
                </Avatar>
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d4470" }}
                >
                  Seasonal Distribution
                </Typography>
              }
              sx={{
                bgcolor: "#f8faff",
                borderBottom: "1px solid #e0e7ff",
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                  Sri Lankan Paddy Cultivation Seasons
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      border: "1px solid #e0e7ff",
                      borderRadius: "8px",
                      bgcolor: "rgba(91,134,229,0.1)",
                      width: "45%",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="#2d4470">
                      Maha Season
                    </Typography>
                    <Typography sx={{ mt: 1 }}>September - March</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Major cultivation season with the northeast monsoon rains
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      border: "1px solid #e0e7ff",
                      borderRadius: "8px",
                      bgcolor: "rgba(91,134,229,0.1)",
                      width: "45%",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="#2d4470">
                      Yala Season
                    </Typography>
                    <Typography sx={{ mt: 1 }}>May - August</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Minor cultivation season with the southwest monsoon rains
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
