import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Avatar from '@mui/material/Avatar';
import CreateIcon from '@mui/icons-material/Create';
import ExploreIcon from '@mui/icons-material/Explore';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LabelIcon from '@mui/icons-material/Label';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

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
    const [tags, setTags] = React.useState([]);
    const [questions, setQuestion] = React.useState([]);
    async function getTopTags() {
        const res = await fetch('http://localhost:5002/question/top_tags/5',{
            method: 'GET'
        });
        const x = await res.json();
        setTags(x);
    }
    async function getTopQuestions(){
      const res = await fetch('http://localhost:5002/question/top_questions/5',{
        method: 'GET'
      });
      const x = await res.json();
      setQuestion(x);
    }
    React.useEffect(()=>{
      getTopTags();
      getTopQuestions();
    },[])
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
                <ListItemButton component="a" href="/create">
                    <ListItemIcon>
                      <CreateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Question" />
                  </ListItemButton>
                  <ListItemButton component="a" href="/explore">
                    <ListItemIcon>
                      <ExploreIcon />
                    </ListItemIcon>
                    <ListItemText primary="Explore" />
                  </ListItemButton>
                <Divider sx={{ my: 1 }}/>
                <ListSubheader component="div" inset>
                  Top 5 Tags
                </ListSubheader>
                {/* <ListItemButton href='/'> */}
                {tags?.map((tag) => {
                  return (
                    <ListItemButton key={tag.id}>
                      <ListItemIcon>
                        <LabelIcon />
                      </ListItemIcon>
                      <ListItemText primary={tag.tag_name} primaryTypographyProps={{fontSize: '0.8em'}}/>
                    </ListItemButton>
                  )
                })}
                <Divider sx={{ my: 1 }} />
                <ListSubheader component="div" inset>
                  Top 5 Questions
                </ListSubheader>
                {
                  questions?.map((question)=> {
                    return (
                      <ListItemButton component="a" href={`/posts/${question.owner_user_id}/${question.id}`} key={question.id}>
                        <ListItemIcon>
                          <QuestionAnswerIcon />
                        </ListItemIcon>
                        <ListItemText primary={question.title} primaryTypographyProps={{fontSize: '0.8em',overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}}/>
                      </ListItemButton>
                    )
                  })
                }

            </List>
            </Drawer>
        </ThemeProvider>
    );
}
