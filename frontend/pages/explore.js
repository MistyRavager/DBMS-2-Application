import React, {useEffect, useState} from 'react';
import Sidebar from '../components/sidebar'
import Head from 'next/head';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import AutoSearch from '../components/autoSearch';

function devChip (arr, name, getTagProps, index) {
  var result = arr.find(item => item.name == name)
  return <Chip variant="outlined" label={result.id + " : " + name} {...getTagProps({ index })} color='primary'/>
}

// Tags
const tags = [
  { name: "Rust", id: 1},
  { name: "C++", id: 2},
  { name: "Java", id: 3},
  { name: "Python", id: 4}
]

// Usernames
const users = [
  { name: "Rahul", id: 1 },
  { name: "Rishit", id: 2},
  { name: "Kushagra", id: 3},
]


export default function Explore() {
  /* State */
  const [formData, setFormData] = useState({})
  console.log(formData)
  return (
  <>
  <Head>
      <title>Explore</title>
  </Head>
  <Box sx={{ display: 'flex' }}>
    <Sidebar/> 
    {/* no login */}
    <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          // backgroundImage: 'url(https://source.unsplash.com/random)',
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 0, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} >
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  fontFamily: 'Roboto',
                }}
              >
                <Typography variant="h4" component="div" gutterBottom sx={{marginLeft: "25%", width: "50%"}}> 
                  What are you looking for?
                </Typography>

                <Stack spacing={3} sx={{ ml: "25%", width: "50%" }}>
                  <AutoSearch setDetails={setFormData}/>
                </Stack>

              </Paper>
            </Grid>
            
            <Grid item xs={6} sx={{ml:"25%"}}>
              <Typography variant="h6" component="div" gutterBottom sx={{textAlign:'center'}}>
                Didn't find what you were looking for?
              </Typography>
              {/* <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
                  <Button variant="outlined" href="/signin" sx={{width:"100%"}}>
                      Login to create a post
                  </Button>
              {/* </Card> */}
            </Grid>
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
  </Box>
  </>
  );
}