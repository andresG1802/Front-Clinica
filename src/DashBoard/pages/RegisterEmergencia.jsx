import { useState } from 'react';
import { Button, Grid, TextField, Typography, Alert } from '@mui/material';
import { DpersonalMedicoLayout } from '../layout/DPersonalMedicoLayout';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const RegisterEmergenciaPage = () => {
  const [formData, setFormData] = useState({
    paciente_id:'',
    personal_medico_id:'',
    medico_id:'',
    descripcion:'',
    severidad:''
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
    const dataToSubmit = {
        ...formData,
        paciente_id: parseInt(formData.paciente_id, 10),
        personal_medico_id: parseInt(formData.personal_medico_id, 10),
        medico_id: parseInt(formData.medico_id, 10),
    };
    try {
      const response = await fetch(`${api}api/emergencias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit)
      });

      if (!response.ok) {
        throw new Error('Error al registrar la emergencia');
      }

      setSuccess('Emergencia registrada exitosamente');
      navigate('/historial-emergencias'); // Redirige a la página de historial de emergencias
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <DpersonalMedicoLayout>
      <Typography variant="h4" gutterBottom>
        Registrar Emergencia
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                label="ID de Paciente"
                name="paciente_id"
                value={formData.paciente_id}
                onChange={handleChange}
                fullWidth
                required
                />
           </Grid>
           <Grid item xs={12}>
                <TextField
                label="personal_medico_id"
                name="personal_medico_id"
                value={formData.personal_medico_id}
                onChange={handleChange}
                fullWidth
                required
                />
            </Grid>
            <Grid item xs={12}>
            <TextField
              label="ID de Médico"
              name="medico_id"
              value={formData.medico_id}
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
              label="Severidad"
              name="severidad"
              value={formData.severidad}
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
              Registrar Emergencia
            </Button>
          </Grid>
        </Grid>
      </form>
    </DpersonalMedicoLayout>
  );
};
export default RegisterEmergenciaPage;
