import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Box, Button } from '@mui/material';
import { DashBoardLayout } from '../layout/DashBoardLayout';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ViewTratamientoPage = () => {
  const [tratamientos, setTratamientos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTratamientos = async () => {
      try {
        const response = await fetch(`${api}api/tratamientos`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos de tratamientos');
        }
        const data = await response.json();
        setTratamientos(data);
      } catch (error) {
        console.error('Error fetching tratamientos:', error);
      }
    };

    fetchTratamientos();
  }, []);

  const fetchDeleteTratamiento = async (idTratamiento) => {
    try {
      const response = await fetch(`${api}api/tratamientos/${idTratamiento}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el tratamiento');
      }

      // Actualizar la lista de tratamientos después de eliminar
      const updatedTratamientos = tratamientos.filter(tratamiento => tratamiento.id !== idTratamiento);
      setTratamientos(updatedTratamientos);

      // Recargar la página para reflejar los cambios
      window.location.reload();

    } catch (error) {
      console.error('Error eliminando el tratamiento:', error);
    }
  };
  const handleRegisterTratamiento = () =>{
    
    
    navigate('/registrar-tratamiento');
  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTratamientos = tratamientos.filter((tratamiento) =>
    tratamiento.paciente_id.toString().includes(searchQuery)
  );

  return (
    <DashBoardLayout>
      <Typography variant="h4" gutterBottom>
        Ver tratamientos
      </Typography>

      <Box mb={2}>
        <TextField 
          label="Buscar por Paciente ID" 
          variant="outlined" 
          fullWidth 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Emergencia ID</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Medicamentos</TableCell>
              <TableCell>Instrucciones</TableCell>
              <TableCell>Paciente ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTratamientos.map((tratamiento) => (
              <TableRow key={tratamiento.id}>
                <TableCell>{tratamiento.id}</TableCell>
                <TableCell>{tratamiento.emergencia_id}</TableCell>
                <TableCell>{tratamiento.descripcion}</TableCell>
                <TableCell>{tratamiento.medicamentos}</TableCell>
                <TableCell>{tratamiento.instrucciones}</TableCell>
                <TableCell>{tratamiento.paciente_id}</TableCell>
                <TableCell>
                  <Button 
                    startIcon={<DeleteIcon />} 
                    onClick={() => fetchDeleteTratamiento(tratamiento.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleRegisterTratamiento}>+ Agregar tratamiento</Button>
    </DashBoardLayout>
  );
};

export default ViewTratamientoPage;
