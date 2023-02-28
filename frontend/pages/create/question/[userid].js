import * as React from 'react';
import Head from 'next/head'
import Sidebar from '../../../components/sidebar'
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
import QuestionDetails from '../../../components/postQuestion';
import AddTags from '../../../components/addTags';
import Review from '../../../components/review';
import {useRouter} from 'next/router'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles';
import MyEditor from "../../../components/editor"
import TextField from '@mui/material/TextField';

// const steps = ['Details','Review Question'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
  'Python',
  'Rust',
  'C++',
  'Error',
  'DBMS',
  'OS',
  'KG',
  'Rishit',
  'Suryaansh',
  'Rahuboy',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <QuestionDetails />;
//     case 1:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

export default function question(props) {
    // const [activeStep, setActiveStep] = React.useState(0);
    const router = useRouter()
    const {userid} = router.query
    const theme = useTheme();
    const [Tags, setTag] = React.useState([]);
    const [data, setData] = React.useState("");
    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setTag(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };
    // const handleNext = () => {
    //     setActiveStep(activeStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep(activeStep - 1);
    // };
    
    

    
    // React.useEffect(() => {
    //   if (!router.isReady) return;
    //     console.log("loading");
    //     getUser();
    // }, [router.isReady]);
  return (
    <>
        <Head>
            <title>Create Question</title>
        </Head>
        <Box sx={{ display: 'flex' }}>
            <Sidebar userid = {userid}/>
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
            Question Details
          </Typography>
          {/* <QuestionDetails /> */}
          <Grid container spacing={3} sx={{mt:2}}>
        <Grid item xs={12}>
          <TextField
            required
            id="questionTitle"
            name="questionTitle"
            label="Question Title"
            fullWidth
            autoComplete="given-title"
            variant="outlined"
            multiline
          />

        </Grid>
        <Grid item xs={12}>
          <Typography sx={{  fontSize:20 }} gutterBottom color="text.secondary">
            Question Description
          </Typography>
          <MyEditor data={setData}/>
        </Grid>

        
        <Grid item xs={12}>
          <FormControl sx={{ width: '50%', ml:'25%' }}>
          <InputLabel id="demo-multiple-chip-label">Select Tags</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={Tags}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Select Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {tags.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, Tags, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
        </Grid>
        
      </Grid>
          {/* <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 ,mr:10,ml:10}}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
          {/* {activeStep === steps.length ? (
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
              </Box> */}
            {/* </React.Fragment> */}
          {/* )} */}
        </Paper>
      {/* </Container> */}

            </Box>
        </Box>
    </>
  )
}