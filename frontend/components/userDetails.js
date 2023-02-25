import * as React from 'react';
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
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

const mdTheme = createTheme({ palette: { mode: 'light' } });

export default function UserDetails(props) {
    const [posts, setPosts] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const questionsPerPage = 5;
    const answersPerPage = 5;
    async function getQuestions() {
        const response = await fetch(`http://localhost:5002/question/userid/${props.details?.id}?sort_by=creation_date&limit=${questionsPerPage}`, {
            method: "GET"
        });
        const x = await response.json();
        setPosts(x);
    }
    async function getAnswers() {
        const response = await fetch(`http://localhost:5002/answer/userid/${props.details?.id}?sort_by=creation_date&limit=${answersPerPage}`,{
            method: "GET"
        });
        const x = await response.json();
        setAnswers(x);
    }
    React.useEffect(() => {
        getQuestions();
        getAnswers();
    },[props]);

    return (
        <ThemeProvider theme={mdTheme}>
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
                    <Grid item xs={12} md={8} lg={9} xl={10}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            // height: 240,
                            fontFamily: 'Roboto',
                        }}
                        >
                        <Typography variant="h4" component="div" gutterBottom> 
                            Profile of {props.details?.display_name}
                        </Typography>
                        <Typography sx={{fontSize:20}} component="div" gutterBottom color="text.secondary">
                        About {props.details?.display_name}: 
                                <Typography sx={{fontSize:15, marginTop:-2}} dangerouslySetInnerHTML={{__html: props.details?.about_me}} component="div" gutterBottom color="text.secondary">
                                </Typography>
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Reputation: {props.details?.reputation}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Views: {props.details?.views}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Upvotes: {props.details?.up_votes}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Downvotes: {props.details?.down_votes}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Website URL: <Link href={props.details?.website_url}>{props.details?.website_url}</Link>
                                </Typography>
                            </Grid>        
                        </Grid>
                        
                        <Button href='#' size="small" onClick={(e) =>{console.log(props.details)}}>Learn More</Button>

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
                            alt={props.details?.display_name}
                            src={props.details?.profile_image_url}
                            sx={{ width: '100%', height: '100%' }}
                        />

                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="div" gutterBottom>
                                Recent Posts
                                <Button href='#' size="small" onClick={(e) =>{getQuestions(e)}}>Learn More</Button>

                                </Typography>
                            </Grid>
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
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="div" gutterBottom>
                                Recent Answers
                                </Typography>
                            </Grid>
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
                                                {/* {(answer?.id == post?.accepted_answer_id) ? 
                                                    <Chip 
                                                        label="Accepted Answer"
                                                        sx={{color:"#00a152", fontWeight:"bold"}}
                                                        disabled
                                                        variant="outlined"
                                                        icon = {<DoneIcon style={{color:"#00a152"}}/>}
                                                    />
                                                    :<></>} */}
                                                </Typography>
                                                <Typography component={'span'} variant="body2" dangerouslySetInnerHTML={{__html:answer.body}}>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                            </Grid>)})}
                        
                    </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}