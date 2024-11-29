import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { DpersonalMedicoLayout } from '../layout/DPersonalMedicoLayout';
import {  useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
const ViewPacientesPage = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        // Realiza la solicitud HTTP a tu API para obtener pacientes
        const response = await fetch(`${api}api/pacientes`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos de pacientes');
        }
        const data = await response.json();
        setPacientes(data); // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.error('Error fetching pacientes:', error);
      }
    };
    
    fetchPacientes(); // Llama a la función de solicitud al cargar el componente
  }, []); // El segundo argumento [] significa que este efecto se ejecuta solo una vez al montar el componente

  const handleRegisterPaciente = ()=>{
    navigate('/registrar-paciente')
  }
  return (
    <DpersonalMedicoLayout>
      <Typography variant="h4" gutterBottom>
        Ver Pacientes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Historial Médico</TableCell>
              <TableCell>Nombre de Usuario</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell>{paciente.id}</TableCell>
                <TableCell>{paciente.nombre}</TableCell>
                <TableCell>{paciente.edad}</TableCell>
                <TableCell>{paciente.genero}</TableCell>
                <TableCell>{paciente.direccion}</TableCell>
                <TableCell>{paciente.telefono}</TableCell>
                <TableCell>{paciente.historial_medico}</TableCell>
                <TableCell>{paciente.nombreUsuario}</TableCell>
                <TableCell>{paciente.dni}</TableCell>
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
      <Button onClick={handleRegisterPaciente}>+ Agregar Paciente</Button>
    </DpersonalMedicoLayout>
  );
};

export default ViewPacientesPage;
