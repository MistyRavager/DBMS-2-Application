import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Sidebar from '../components/sidebar'
import Head from 'next/head';
import { Avatar, Typography } from '@mui/material';


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
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 0, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
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
                  <Typography variant="h6" component="div" gutterBottom>
                    Some Description: Suri
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom>
                    Some Description: Suri
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  {/* <Deposits /> */}
                  <Avatar
                    alt="SuriBaka"
                    src="/images/profile.jpg"
                    sx={{ width: '100%', height: '100%' }}
                  />

                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* <Orders /> */}
                  <Link href="/dashboard">Dashboard</Link>

                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
    </Box>
    </>
    );
}