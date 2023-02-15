import * as React from 'react';
import Head from 'next/head'
import { Box } from '@mui/material'
import Sidebar from '../components/sidebar'
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import QuestionDetails from '../components/Qdetails';
import AddTags from '../components/addTags';
import Review from '../components/review';




const steps = ['Details','Review Question'];




function getStepContent(step) {
  switch (step) {
    case 0:
      return <QuestionDetails />;
    case 1:
      return <Review />;
    // case 2:
    //   return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function create() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    

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
                mb: 4 ,
                // backgroundImage: 'url(https://source.unsplash.com/random)',
                // backgroundRepeat: 'no-repeat',
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
            }}
            >
            {/* <Container component="main" maxWidth="sm" sx={{ mb: 4 }}> */}
        <Paper variant="outlined" sx={{ m:4, my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Question
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 ,mr:10,ml:10}}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      {/* </Container> */}

            </Box>
        </Box>
    </>
  )
}