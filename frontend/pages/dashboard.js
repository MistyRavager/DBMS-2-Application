import * as React from 'react';
import Sidebar from '../components/sidebar'
import Head from 'next/head';
import Box from '@mui/material/Box';
import UserDetails from '../components/userDetails';
import { Button } from '@mui/material';
export default function Dashboard(props) {
  function handleClick(e) {
    e.preventDefault();
    const getQuestion = async () => {
      const data = {
        // user_id: 7,
        date_flag: "1",
      };

      const response = await fetch(`http://localhost:5002/question/userid/${6}?sort_by=creation_date`, {
        method: "GET"
        // body: JSON.stringify(data),
      });
      return response.json();
    };
    getQuestion().then((data) => {
      // alert(data.message);
      console.log(data);
    });
  }  
  const [userdetails,setUserDetails] = React.useState();
  async function tempGetUser(e) {
      e.preventDefault();
      const response = await fetch(`http://localhost:5002/user/id/${6}`, {
        method: "GET"
      });
      setUserDetails(await response.json());
      return ;
  }
    return (
    <>
    <Head>
        <title>Dashboard</title>
    </Head>
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      <Button onClick={(e)=> {tempGetUser(e)}}>Click</Button>
      <UserDetails details={userdetails}/>
    </Box>
    </>
    );
}