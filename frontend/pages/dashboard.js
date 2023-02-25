import * as React from 'react';
import Sidebar from '../components/sidebar'
import Head from 'next/head';
import Box from '@mui/material/Box';
import UserDetails from '../components/userDetails';
import { Button } from '@mui/material';

export default function Dashboard(props) {
  const [userdetails,setUserDetails] = React.useState();
  async function tempGetUser(e) {
      e.preventDefault();
      const response = await fetch(`http://localhost:5002/user/id/${4}`, {
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
      <Sidebar details={userdetails}/>
      <Button onClick={(e)=> {tempGetUser(e)}}>Click</Button>
      <UserDetails details={userdetails}/>
    </Box>
    </>
    );
}