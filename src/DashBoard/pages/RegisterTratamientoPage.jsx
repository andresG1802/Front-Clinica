import { useState } from 'react';
import { Button, Grid, TextField, Typography, Alert } from '@mui/material';
import { DashBoardLayout } from '../layout/DashBoardLayout';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const RegisterTratamientoPage = () => {
  const [formData, setFormData] = useState({
    emergencia_id: '',
    descripcion: '',
    medicamentos: '',
    instrucciones: '',
    paciente_id: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Convert ID fields to integers
    const dataToSubmit = {
      ...formData,
      emergencia_id: parseInt(formData.emergencia_id, 10),
      paciente_id: parseInt(formData.paciente_id, 10)
    };

    try {
      const response = await fetch(`${api}api/tratamientos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit)
      });

      if (!response.ok) {
        throw new Error('Error al registrar el tratamiento');
      }

      setSuccess('Tratamiento registrado exitosamente');
      navigate('/historial-tratamientos'); // Redirige a la página de historial de tratamiento
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <DashBoardLayout>
      <Typography variant="h4" gutterBottom>
        Registrar Tratamiento
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Emergencia ID"
              name="emergencia_id"
              value={formData.emergencia_id}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Medicamentos"
              name="medicamentos"
              value={formData.medicamentos}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Instrucciones"
              name="instrucciones"
              value={formData.instrucciones}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Paciente ID"
              name="paciente_id"
              value={formData.paciente_id}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar Tratamiento
            </Button>
          </Grid>
        </Grid>
      </form>
    </DashBoardLayout>
  );
};

export default RegisterTratamientoPage;

