

import { Box, Button,Typography } from '@mui/material';
import Register from './components/Register';
import JoinAuction from './components/JoinAuction';
import Login from './components/Login';
import CreateAuction from './components/CreateAuction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Home = (props)=>{
    
    const {user,setAuctionDetail,auctionID,setAuctionID,setUser,join} = props
    const navigate = useNavigate();
   
    const [opnJoin,setOpenJoin]=useState(false);
    const [opnReg,setOpenReg]=useState(false);
    const [opnLog,setOpenLog]=useState(false);
    const [opnCreate,setOpenCreate]=useState(false);  
    
    const handleLogout =()=>{
        setUser(null);
      }
      const handleCloseJoin = ()=>{
        setOpenJoin(false);
      };
      const handleCloseReg = ()=>{
        setOpenReg(false);
      };
      const handleCloseLog = ()=>{
        setOpenLog(false);
      };
      const handleCloseCreate = ()=>{
        setOpenCreate(false);
      };
      const handleJoin = ()=>{
        if(join){
          setOpenJoin(false);
          navigate("/room");
        }else{
          setOpenJoin(true);
        }
    
      }
    return(
        <>
         
      <Typography variant='h1'>Car Bidding System</Typography>
     
     {(user !== null)?<h2>{ `Hi ${user.username}`}</h2>:<></>}
     
     <JoinAuction open={opnJoin} handleClose={handleCloseJoin} setAuctionDetail={setAuctionDetail} auctionID={auctionID} setAuctionID={setAuctionID}  />
     <Register open={opnReg} handleClose={handleCloseReg}/>
     <Login open={opnLog} handleClose={handleCloseLog} setUser={setUser}/>
     <CreateAuction open={opnCreate} handleClose={handleCloseCreate}/>
     
     <Box sx={{
       display:"flex",
       flexDirection:"row",
       flexWrap:"wrap",
       alignContent:"space-between"
     }}>
       <Button variant="contained"sx={{margin:"10px"}} onClick={e=>setOpenReg(true)}>Register</Button>
       {
         (user !== null) ?(
         <>
         <Button variant="contained"sx={{margin:"10px"}}onClick={e=>setOpenCreate(true)}>Create Auction</Button>
         <Button variant="contained"sx={{margin:"10px"}}onClick={e=>handleLogout()}>LogOut</Button>
         <Button variant="contained"sx={{margin:"10px"}} onClick={e=>handleJoin()}>Join Auction</Button> 
         
         </>
         ):(<Button variant="contained"sx={{margin:"10px"}}onClick={e=>setOpenLog(true)}>Login</Button>)
       }
       
       
     </Box>
     
        </>
    )

}

export default Home;