import React, {useEffect, useId, useImperativeHandle, useState} from 'react';
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
import { formGroupClasses } from '@mui/material';

export default function Explore() {
  /* State */
  const [formData, setFormData] = useState()
  const [tagPass, setTagPass] = useState()
  const [userPass, setUserPass] = useState()

  /* 
  {posts?.map((post) => {
                                return (
                                    <Grid item xs={12}  key={post.id}>
                                        <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
                                            <CardContent>
                                                <Typography sx={{fontSize:20}} component="div">
                                                QuestionID {post.id}: {post.title} 
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Tags: {post.tags}
                                                </Typography>
                                                <Typography variant="body2" dangerouslySetInnerHTML={{__html:post.body}}>
                                                </Typography>
                                                <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.secondary">
                                                Score: {post.score} Answers: {post.answer_count} View Count: {post.view_count} 
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button href={`/posts/${props.details?.id}/${post.id}`} size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>)})}
  */

  /* useEffect: Tracks changes in formData */
  useEffect(() => {

    // Parse object to get tagSQL
    const tagParse = formData?.tags.map((tag)=>{
      return "&tags=<"+tag.split(":")[1]+">";
    })
    const tagSQL = tagParse?.join("")
    console.log(tagSQL)

    // Parse object to get userID
    const userSQL = formData?.users.split(":")[0]

    // Fetch
    if(tagSQL != '' && tagSQL != undefined)
    {
      fetch(`http://localhost:5002/post/tags?score_flag=1&date_flag=0${tagSQL}&limit=5`,{
                method: 'GET',
                credentials: 'include'
            }).then(
                response => response.json()
            ).then(
                data => {
                    setTagPass(data)
                }
            )
    }
  }, [formData])
  
  /* Test */
  useEffect(()=>{
  console.log("Current Tags: \n", tagPass)

  },[tagPass])

  /* Main Return */
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

            {tagPass?.map((post) => {
                                return (
                                    <Grid item xs={12}  key={post.id}>
                                        <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
                                            <CardContent>
                                                <Typography sx={{fontSize:20}} component="div">
                                                QuestionID {post.id}: {post.title} 
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Tags: {post.tags}
                                                </Typography>
                                                <Typography variant="body2" dangerouslySetInnerHTML={{__html:post.body}}>
                                                </Typography>
                                                <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.secondary">
                                                Score: {post.score} Answers: {post.answer_count} View Count: {post.view_count} 
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button href={`/posts/${post.owner_user_id}/${post.id}`} size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>)})}
            
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