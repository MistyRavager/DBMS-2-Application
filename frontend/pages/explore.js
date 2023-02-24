import * as React from 'react';
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

export default function Explore() {
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
                  <Typography variant="h4" component="div" gutterBottom> 
                    What are you looking for?
                  </Typography>

                  {/* search bar */}
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