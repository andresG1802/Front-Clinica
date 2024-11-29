import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar} from '../components';
import { SideBar2 } from '../components/SideBar2';


const drawerWidth = 280;

export const DpersonalMedicoLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        <NavBar drawerWidth={ drawerWidth } />

        <SideBar2 drawerWidth={ drawerWidth } />

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />

            { children }
            
        </Box>
    </Box>
  )
}