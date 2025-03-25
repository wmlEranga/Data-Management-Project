import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CalendarToday, AddCircle } from "@mui/icons-material";
import AddCultivationModal from "../components/AddCultivationModal";
import config from "../config";

function CultivationData() {
  const { id } = useParams();
  const [cultivationData, setCultivationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = () => {
    fetch(`${config.backendUrl}/cultivation/get-cultivation/${id}`)
      .then((response) => response.json())
      .then((data) => setCultivationData(data.$values))
      .catch((error) =>
        console.error("Error fetching cultivation data:", error)
      );
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchData(); // Refresh data after modal closes
  };

  if (!cultivationData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ bgcolor: "#f5f7fa" }}
      >
        <CircularProgress sx={{ color: "#5B86E5" }} />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ pt: 4, pb: 6, bgcolor: "#f5f7fa", minHeight: "100vh" }}
    >
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#2d4470",
            fontWeight: 600,
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
          Cultivation Data
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          sx={{
            background: "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(91,134,229,0.3)",
            padding: "10px 24px",
            fontWeight: 500,
            "&:hover": {
              background: "linear-gradient(90deg, #5078d5 30%, #32bec8 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 12px rgba(91,134,229,0.4)",
            },
            transition: "all 0.3s ease",
          }}
          startIcon={<AddCircle />}
        >
          Add Cultivation Data
        </Button>
      </Box>

      <Typography variant="subtitle1" sx={{ color: "#666", mb: 2 }}>
        Project ID: {id}
      </Typography>

      <Card
        elevation={0}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e0e7ff",
          mb: 4,
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
                background: "linear-gradient(90deg, #5B86E5 30%, #36D1DC 100%)",
              }}
            >
              <CalendarToday />
            </Avatar>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#2d4470" }}>
              Cultivation Information
            </Typography>
          }
          sx={{
            bgcolor: "#f8faff",
            borderBottom: "1px solid #e0e7ff",
          }}
        />
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#2d4470",
                      bgcolor: "#f8faff",
                      fontSize: "0.9rem",
                    }}
                  >
                    Date Recorded
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#2d4470",
                      bgcolor: "#f8faff",
                      fontSize: "0.9rem",
                    }}
                  >
                    Growth Stage
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#2d4470",
                      bgcolor: "#f8faff",
                      fontSize: "0.9rem",
                    }}
                  >
                    Water Level
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#2d4470",
                      bgcolor: "#f8faff",
                      fontSize: "0.9rem",
                    }}
                  >
                    Fertilizer Used
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#2d4470",
                      bgcolor: "#f8faff",
                      fontSize: "0.9rem",
                    }}
                  >
                    Pesticide Used
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#2d4470",
                      bgcolor: "#f8faff",
                      fontSize: "0.9rem",
                    }}
                  >
                    Disease Report
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cultivationData.map((data, index) => (
                  <TableRow
                    key={data.id}
                    sx={{
                      "&:nth-of-type(odd)": {
                        bgcolor: "rgba(91,134,229,0.03)",
                      },
                      "&:hover": {
                        bgcolor: "rgba(91,134,229,0.08)",
                      },
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      {new Date(data.dateRecorded).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      {data.growthStageName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      {data.waterLevelName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      {data.fertilizerUsed}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      {data.pesticideUsed}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      {data.diseaseReport}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <AddCultivationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        projectId={id}
        cropId={id} // Pass the id as cropId to ensure it gets used
      />
    </Container>
  );
}

export default CultivationData;
