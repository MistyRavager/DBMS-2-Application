import * as React from 'react';
import Sidebar from '../../components/sidebar'
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
export default function Post() {
    const router = useRouter()
    const { postid} = router.query
    const [post,setPost] = React.useState();
    const [answers, setAnswers] = React.useState();
    const [actualuserdetails,setActualUserDetails] = React.useState();
    const [postuserdetails, setPostUserDetails] = React.useState();

    async function getAnswer() {
      const response = await fetch(`http://localhost:5002/answer/questionid/${postid}?sort_by=score`, {
          method: "GET",
          credentials: 'include'
      });
      if (response.status==200){
	      const x = await response.json();
	      setAnswers(x);      
      }
    } 

    async function getPost() {
      const response = await fetch(`http://localhost:5002/post/id/${postid}`, {
          method: "GET",
          credentials: 'include'
      });
      const x = await response.json();
      setPost(x);
    }
    async function actualGetUser() {
        try {
        const response = await fetch(`http://localhost:5002/me`, {
          method: "GET",
          credentials: 'include'
        });
        if (response.status === 401) {
          console.log("Unauthorized");
          router.push("/signin");
        }
        setActualUserDetails(await response.json());
      } catch (err) {
        console.log(err);
      }
  
        return ;
    }
    async function getPostUser() {
        const response = await fetch(`http://localhost:5002/user/id/${post?.owner_user_id}`, {
            method: "GET",
            credentials: 'include'
        });
        if (response.status==200){
        	const x = await response.json();
		setPostUserDetails(x);
        }
        // setUserDetails(x);
       
    }


      async function deletePost(id){
	const response = await fetch(`http://localhost:5002/post/delete/${id}`, {
	  method: "DELETE",
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  credentials: 'include',
	});
	console.log(await response.json());
	if (response.status === 200) {
	  router.push("/dashboard");
	}
      }
      	      
    
    async function getAll() {
      actualGetUser();
      getPost();
      // getUser();
      getAnswer();
    }
    
    React.useEffect(() => {
      if (!router.isReady) return;
        console.log("loading");
        getAll();
    }, [router.isReady]);
    React.useEffect(()=>{
      getPostUser()
    },[post])

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
                  
                  <Grid item xs={4} sx={{ml:"66%"}}>
                  

                    <Card sx={{ maxWidth: "100%"}}>
                        {
                          (postuserdetails?.display_name)?<><CardHeader
                              avatar={
                              <Avatar
                                alt={postuserdetails?.display_name}
                                src={postuserdetails?.profile_image_url}
                              />
                              }
                              title={postuserdetails?.display_name}
                              subheader={makeDate(post?.creation_date)}
                          />
                          {(actualuserdetails?.id == post?.owner_user_id)?<CardActions>
                            <Button href={`/edit/question/${post?.id}`} size="small">Edit Question <EditIcon/></Button>
                            <Button sx={{color:"red", ml:3}} onClick={(e)=>{deletePost(post?.id)}} size="small">Delete Question <DeleteIcon/></Button>
                          </CardActions>:<></>}
                          </>
                          :
                          <><CardHeader
                              avatar={
                              <Avatar
                                alt={postuserdetails?.display_name}
                                src={postuserdetails?.profile_image_url}
                              />
                              }
                              title={"Deleted User"}
                              subheader={makeDate(post?.creation_date)}
                          />
                          {(actualuserdetails?.id == post?.owner_user_id)?<CardActions>
                            <Button href={`/edit/question/${post?.id}`} size="small">Edit Question</Button>
                          </CardActions>:<></>}
                          
                          </>
                          }
                    </Card>
                  </Grid>

                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6" component="div" gutterBottom>
                    Answers
                    <Button component="a" href={`/create/answer/${post?.id}`}  sx={{float:"middle", ml:2}}>
                      Add Answer 
                    </Button>
                  </Typography>
                </Grid>
                <Grid container spacing={3}>    
                    {answers?.map((answer) => {
                        return (
                            <Grid item xs={12} key={answer?.id}>
                                <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
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

                                    {(answer?.owner_display_name)?<><CardHeader
                                            avatar={
                                            <Avatar
                                            alt={answer?.owner_display_name}
                                            src={answer?.owner_display_name}
                                            />
                                            }
                                            title={answer?.owner_display_name}
                                            subheader={makeDate(answer?.creation_date)}
                                        />
                                        {(actualuserdetails?.id == post?.owner_user_id)?<><CardActions>
                            <Button href={`/edit/answer/${answer?.id}`} size="small">Edit Answer  <EditIcon/></Button>
                            <Button sx={{color:"red", ml:3}} onClick={(e)=>{deletePost(answer?.id)}} size="small">Delete Answer <DeleteIcon/></Button>
                          </CardActions></>:<></>}
                                        </>:
                                        <>
                                        <CardHeader
                                            avatar={
                                            <Avatar
                                            alt={answer?.owner_display_name}
                                            src={answer?.owner_display_name}
                                            />
                                            }
                                            title={"Deleted User"}
                                            subheader={makeDate(answer?.creation_date)}
                                        />
                                        {(actualuserdetails?.id == post?.owner_user_id)?<CardActions>
                                          <Button href={`/edit/answer/${answer?.id}`} size="small">Edit Answer</Button>
                                        </CardActions>:<></>}
                                        </>
                                        }
                                      
                                </Card>
                            </Grid>)})}
                </Grid>
                
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
    </Box>
    </>
    );
}
