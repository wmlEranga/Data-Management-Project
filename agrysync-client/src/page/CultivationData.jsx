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
import { CalendarToday } from "@mui/icons-material";
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
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Cultivation Data for Project ID: {id}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleOpenModal}>
          Add Cultivation Data
        </Button>
      </Box>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <CalendarToday />
            </Avatar>
          }
          title="Cultivation Information"
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date Recorded</TableCell>
                  <TableCell>Growth Stage</TableCell>
                  <TableCell>Water Level</TableCell>
                  <TableCell>Fertilizer Used</TableCell>
                  <TableCell>Pesticide Used</TableCell>
                  <TableCell>Disease Report</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cultivationData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      {new Date(data.dateRecorded).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{data.growthStageName}</TableCell>
                    <TableCell>{data.waterLevelName}</TableCell>
                    <TableCell>{data.fertilizerUsed}</TableCell>
                    <TableCell>{data.pesticideUsed}</TableCell>
                    <TableCell>{data.diseaseReport}</TableCell>
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
