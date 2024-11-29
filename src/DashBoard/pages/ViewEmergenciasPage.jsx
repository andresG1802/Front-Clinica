import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { DashBoardLayout } from '../layout/DashBoardLayout';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const ViewEmergenciasPage = () => {
  const [emergenciass, setEmergenciass] = useState([]);

  useEffect(() => {
    const fetchEmergencias = async () => {
      try {
        // Realiza la solicitud HTTP a tu API para obtener emergencias
        const response = await fetch(`${api}api/emergencias`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos de emergencias');
        }
        const data = await response.json();
        setEmergenciass(data); // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.error('Error fetching emergencias:', error);
      }
    };

    fetchEmergencias(); // Llama a la función de solicitud al cargar el componente

  }, []); // El segundo argumento [] significa que este efecto se ejecuta solo una vez al montar el componente

  return (
    <DashBoardLayout>
      <Typography variant="h4" gutterBottom>
        Ver emergencias
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Severidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emergenciass.map((emergencia) => (
              <TableRow key={emergencia.id}>
                <TableCell>{emergencia.id}</TableCell>
                <TableCell>{new Date(emergencia.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{emergencia.descripcion}</TableCell>
                <TableCell>{emergencia.severidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashBoardLayout>
  );
};

export default ViewEmergenciasPage;

