import * as React from 'react';
import Sidebar from '../components/sidebar'
import Head from 'next/head';
import { Avatar, Card, Typography, Toolbar, Grid, Paper, Container, Box} from '@mui/material';
import {  CardContent, CardActions, Button } from '@mui/material';

export default function Dashboard() {
    return (
    <>
    <Head>
        <title>Dashboard</title>
    </Head>
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      
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
              <Grid item xs={12} md={8} lg={9} xl={10}>
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
                    Welcome Back, SuriBaka
                  </Typography>
                  <Typography sx={{fontSize:25}} component="div" gutterBottom color="text.secondary">
                    Some Description: Suri
                  </Typography>
                  <Typography sx={{fontSize:25}} component="div" gutterBottom color="text.secondary">
                    Some Description: Baka
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3} xl={2}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Avatar
                    alt="SuriBaka"
                    src="/images/profile.jpg"
                    sx={{ width: '100%', height: '100%' }}
                  />

                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Recent Posts
                </Typography>
                <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography sx={{fontSize:20}} component="div">
                      Question: What is the meaning of life?
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Tag1 Tag2 Tag3
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.secondary">
                      Upvotes: 100 Downvotes: 0 Answers: 10 
                    </Typography>
                    <Typography variant="body2">
                      Top Answer :<br/>
                      the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death.
                    </Typography>
                  </CardContent>
                <CardActions>
                  <Button href='#' size="small">Learn More</Button>
                </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Recent Answers
                </Typography>
                <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography sx={{fontSize:20}} component="div">
                      Question: What is the meaning of life? Part 2
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Tag1 Tag2 Tag3
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.secondary">
                      Upvotes Received: 100 Downvotes: 0 Answers: 10 
                    </Typography>
                    <Typography variant="body2">
                      Your Answer {'(Top Answer??)'} :<br/>
                      the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death.
                    </Typography>
                  </CardContent>
                <CardActions>
                  <Button href='#' size="small">Learn More</Button>
                </CardActions>
                </Card>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
    </Box>
    </>
    );
}