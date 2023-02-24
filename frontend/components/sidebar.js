import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { mainListItems, topTags, topQuestions } from './listitems';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
const drawerWidth = 300;
const mdTheme = createTheme({
  palette: {
    mode: 'light',
  }
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        height : '100vh',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
  
const profile =(
    <React.Fragment>
      <ListItemButton component="a" href="/dashboard">
        <ListItemIcon>
          <Avatar
            alt="SuriBaka"
            src="/images/profile.jpg"
            // sx={{ width: '100%', height: '100%' }}
          />
          </ListItemIcon>
        <ListItemText primary="Username" />
      </ListItemButton>
    </React.Fragment>
)
export default function Sidebar() { 
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                display: 'abosolute',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                  {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {profile}
                <Divider sx={{ my: 1 }}/>
                {mainListItems}
                <Divider sx={{ my: 1 }}/>
                {topTags}
                <Divider sx={{ my: 1 }} />
                {topQuestions}
            </List>
            </Drawer>
        </ThemeProvider>
    );
}
