import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { DashBoardLayout } from '../layout/DashBoardLayout';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { DpersonalMedicoLayout } from '../layout/DPersonalMedicoLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export const ViewHistorialEmergenciasPage = () => {
  const [emergencias, setEmergencias] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmergencias = async () => {
      try {
        // Realiza la solicitud HTTP a tu API para obtener emergencias
        const response = await fetch(`${api}api/emergencias`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos de emergencias');
        }
        const data = await response.json();
        setEmergencias(data); // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.error('Error fetching emergencias:', error);
      }
    };

    fetchEmergencias(); // Llama a la función de solicitud al cargar el componente

  }, []); // El segundo argumento [] significa que este efecto se ejecuta solo una vez al montar el componente
  const handleRegisterEmergencia = () =>{
    
    
    navigate('/registrar-emergencia');
  }
  const fetchDeleteEmergencia = async (idEmergencia) => {
    try {
      const response = await fetch(`${api}api/emergencias/${idEmergencia}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el emergencia');
      }

      // Actualizar la lista de emergencias después de eliminar
      const updatedemergencias = emergencias.filter(emergencia => emergencia.id !== idEmergencia);
      setEmergencias(updatedemergencias);

      // Recargar la página para reflejar los cambios
      window.location.reload();

    } catch (error) {
      console.error('Error eliminando el emergencia:', error);
    }
  };
  return (
    <DpersonalMedicoLayout>
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
            {emergencias.map((emergencia) => (
              <TableRow key={emergencia.id}>
                <TableCell>{emergencia.id}</TableCell>
                <TableCell>{new Date(emergencia.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{emergencia.descripcion}</TableCell>
                <TableCell>{emergencia.severidad}</TableCell>
                <TableCell>
                  <Button 
                    startIcon={<DeleteIcon />} 
                    onClick={() => fetchDeleteEmergencia(emergencia.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleRegisterEmergencia}>+ Agregar emergencia</Button>
    </DpersonalMedicoLayout>
  );
};

