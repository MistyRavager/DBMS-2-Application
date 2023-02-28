import * as React from 'react';
import Head from 'next/head'
import Sidebar from '../../../../components/sidebar'
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
import QuestionDetails from '../../../../components/postQuestion';
import AddTags from '../../../../components/addTags';
import Review from '../../../../components/review';
import {useRouter} from 'next/router'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles';
import MyEditor from "../../../../components/editor"
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DoneIcon from '@mui/icons-material/Done';
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


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function answer(props) {
    // const [activeStep, setActiveStep] = React.useState(0);
    const router = useRouter()
    const {userid, qid} = router.query
    const theme = useTheme();
    const [data, setData] = React.useState("");
    const [post,setPost] = React.useState();
    const [answers, setAnswers] = React.useState();
    const [userdetails,setUserDetails] = React.useState();
    async function getUser() {
      const response = await fetch(`http://localhost:5002/user/id/${post?.owner_user_id}`, {
          method: "GET",
          credentials: 'include'
      });
      const x = await response.json();
      setUserDetails(x);
  }
    async function getPost() {
      const response = await fetch(`http://localhost:5002/post/id/${qid}`, {
          method: "GET",
          credentials: 'include'
      });
      const x = await response.json();
      setPost(x);
    }
    async function getAnswer() {
      const response = await fetch(`http://localhost:5002/answer/questionid/${qid}?sort_by=score`, {
          method: "GET",
          credentials: 'include'
      });
      const x = await response.json();
      setAnswers(x);
    } 
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      async function postAnswer(){
        const response = await fetch(`http://localhost:5002/question/answer/${qid}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            post_id: qid,
            user_id: userid,
            answer: data,
          })
        });
        console.log(await response.json());
        if (response.status === 200) {
          router.push("/dashboard");
        }
      }
      postAnswer();
    };
    React.useEffect(() => {
      if (!router.isReady) return;
        console.log("loading");
        getPost();
        getAnswer();
        // getUser();
    }, [router.isReady]);
    React.useEffect(() => {
      if (!post) return;
        console.log("loading");
        getUser();
    }, [post]);
    function makeDate(date) {
      if (date == null) return "";
      const t = date.split(/[-T:.]/);
      const d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
      return d.toLocaleString();
  }
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
        <Paper variant="outlined" sx={{ m:4, my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Question
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // height: 240,
                    fontFamily: 'Roboto',
                  }}
                >
                <Typography variant="h2" component="div" sx={{fontSize:25}}>  
                {post?.title}
                </Typography>
                <Typography sx={{fontSize:20}} component="div" gutterBottom color="text.secondary" dangerouslySetInnerHTML={{__html:post?.body}}>
                
                </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                Score: {post?.score}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                Views: {post?.view_count}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                Tags: {post?.tags}
                            </Typography>
                        </Grid>     
                    </Grid>
                  
                  <Grid item xs={3} sx={{ml:"75%"}}>
                    <Card sx={{ maxWidth: "100%"}}>
                        <CardHeader
                            avatar={
                            <Avatar
                              alt={userdetails?.display_name}
                              src={userdetails?.profile_image_url}
                            />
                            }
                            // action={
                            // <IconButton aria-label="settings">
                            //     <MoreVertIcon />
                            // </IconButton>
                            // }
                            title={userdetails?.display_name}
                            subheader={makeDate(post?.creation_date)}
                        />
                    </Card>
                    </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Answers
                </Typography>
                <Grid container spacing={3}>    
                    {answers?.map((answer) => {
                        return (
                            <Grid item xs={12} key={answer?.id}>
                                <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
                                        <Typography sx={{fontSize:20}} component="div">
                                        AnswerID: {answer?.id} 
                                        </Typography>
                                        <Typography component={'span'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Score: {answer?.score}
                                        </Typography>
                                        <Typography component={'div'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {(answer?.id == post?.accepted_answer_id) ? 
                                            <Chip 
                                                label="Accepted Answer"
                                                sx={{color:"#00a152", fontWeight:"bold"}}
                                                disabled
                                                variant="outlined"
                                                icon = {<DoneIcon style={{color:"#00a152"}}/>}
                                            />
                                            :<></>}
                                        </Typography>
                                        <Typography component={'span'} variant="body2" dangerouslySetInnerHTML={{__html:answer.body}}>
                                        </Typography>
                                    </CardContent>
                                    <CardHeader
                                            avatar={
                                            <Avatar
                                            alt={answer?.last_editor_display_name}
                                            src={answer?.last_editor_display_name}
                                            />
                                            }
                                            // action={
                                            // <IconButton aria-label="settings">
                                            //     <MoreVertIcon />
                                            // </IconButton>
                                            // }
                                            title={answer?.last_editor_user_id}
                                            subheader={makeDate(answer?.last_edit_date)}
                                        />
                                </Card>
                            </Grid>)})}
                </Grid>
                
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Paper>
        <Paper variant="outlined" sx={{ m:4, my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Answer Details
          </Typography>
          {/* <QuestionDetails /> */}
          <Grid container spacing={3} sx={{mt:2}}>
        <Grid item xs={12}>
          <Typography sx={{  fontSize:20 }} gutterBottom color="text.secondary">
            Answer Description
          </Typography>
          
          <MyEditor data={setData}/>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={handleSubmit}
          >
            Post
          </Button>
        </Grid>
        
      </Grid>
        </Paper>

            </Box>
        </Box>
    </>
  )
}