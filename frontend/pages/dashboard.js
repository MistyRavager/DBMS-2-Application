import * as React from 'react';
import Sidebar from '../components/sidebar'
import Head from 'next/head';
import Box from '@mui/material/Box';
import UserDetails from '../components/userDetails';
import { Button } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';


export default function Dashboard(props) {
  const [userdetails,setUserDetails] = React.useState();
  const [userid, setUserId] = React.useState(4);
  // const navigate = useNavigate();
  const router = useRouter();

  async function tempGetUser(e) {
      e.preventDefault();
      try {
      const response = await fetch(`http://localhost:5002/user/id/${4}`, {
        method: "GET"
      });
      if (response.status === 401) {
        console.log("ho gaya1");
        router.push("/signin");
      }
      setUserDetails(await response.json());
    } catch (err) {
      console.log("ho gaya");
    }

      return ;
  }
  React.useEffect(()=>{
    setUserId(userdetails?.id);
  },[userdetails])
    return (
    <>
    <Head>
        <title>Dashboard</title>
    </Head>
    <Box sx={{ display: 'flex' }}>
      {/* <Sidebar userid={userid}/> */}
      <Button onClick={(e)=> {tempGetUser(e)}}>Click</Button>
      {/* <UserDetails details={userdetails}/> */}
    </Box>
    </>
    );
}