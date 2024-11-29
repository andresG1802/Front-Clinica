import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom'; // Importa RouterLink de react-router-dom

export const SideBar2 = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent' // temporary
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Personal Medico
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {
            [
              { text: 'Registrar emergencia', link: '/registrar-emergencia' },
              { text: 'Historial emergencias', link: '/historial-emergencias' },
              { text: 'Ver pacientes', link: '/ver-paciente' },
              { text: 'Registrar pacientes', link: '/registrar-paciente' }
            ].map(item => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={RouterLink} to={item.link}>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
