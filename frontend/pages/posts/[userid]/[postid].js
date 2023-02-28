import * as React from 'react';
import Sidebar from '../../../components/sidebar'
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
import CardHeader  from '@mui/material/CardHeader';
import {useRouter} from 'next/router'
import  Chip  from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
export default function Post() {
    const router = useRouter()
    const {userid, postid} = router.query
    const [post,setPost] = React.useState();
    const [answers, setAnswers] = React.useState();
    const [userdetails,setUserDetails] = React.useState();


    async function getAnswer() {
      const response = await fetch(`http://localhost:5002/answer/questionid/${postid}?sort_by=score`, {
          method: "GET",
          credentials: 'include'
      });
      const x = await response.json();
      setAnswers(x);
    } 

    async function getPost() {
      const response = await fetch(`http://localhost:5002/post/id/${postid}`, {
          method: "GET",
          credentials: 'include'
      });
      const x = await response.json();
      setPost(x);
    }
    
    async function getUser() {
        const response = await fetch(`http://localhost:5002/user/id/${userid}`, {
            method: "GET",
            credentials: 'include'
        });
        const x = await response.json();
        setUserDetails(x);
    }

    async function getAll() {
      getPost();
      getUser();
      getAnswer();
    }
    
    React.useEffect(() => {
      if (!router.isReady) return;
        console.log("loading");
        getAll();
    }, [router.isReady]);
    // console.log(post);
    // console.log(userdetails);
    // console.log(answers);
    function makeDate(date) {
        if (date == null) return "";
        const t = date.split(/[-T:.]/);
        const d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        return d.toLocaleString();
    }
    return (
    <>
    <Head>
        <title>Post</title>
    </Head>
    <Box sx={{ display: 'flex' }}>
      <Sidebar userid={userid}/>
      
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
              <Grid item xs={12}>
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
              {/* <Grid item xs={12}>
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
              </Grid> */}
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
    </Box>
    </>
    );
}