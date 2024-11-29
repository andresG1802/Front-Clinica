import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom'; // Importa RouterLink de react-router-dom

export const SideBar = ({ drawerWidth = 240 }) => {
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
            Medico
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {
            [
              { text: 'Ver emergencias', link: '/emergencias' },
              { text: 'Registrar tratamiento', link: '/registrar-tratamiento' },
              { text: 'Historial tratamientos', link: '/historial-tratamientos' }
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

