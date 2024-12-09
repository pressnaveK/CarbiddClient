import { Button, Typography, TextField , Box } from "@mui/material";
import React, { useState , useEffect , useRef } from 'react';

import io from 'socket.io-client';
import axios from 'axios';



const AuctionRoom = (props)=>{
    
    const { auctionDetail,  user ,join,setJoin} = props;
    const [amount,setAmount]=useState(0);
    const socketRef = useRef(null);
    useEffect(() => {
        socketRef.current = io('http://localhost:5000');
        socketRef.current.on('connect', () => {
          console.log('Connected to socket server:', socketRef.current.id);
        });
        const update = setInterval(() => {
          socketRef.current.emit('update',auctionDetail.auction_id); 
          
        }, 1000);
    
        socketRef.current.on("updated",(data)=>{
          console.log(data);
    
        });
        // Cleanup the socket connection on unmount
        return () => {
            clearInterval(update);
            socketRef.current.disconnect();
        };
        
      }, [auctionDetail.auction_id]);

      const joinAuction = () => {
        if (user !== null && auctionDetail !== null) {
          socketRef.current.emit('join_auction', auctionDetail.auction_id);
          setJoin(true);
        }
      };
    
      const leaveAuction = () => {
        if (user !== null && auctionDetail !== null) {
          socketRef.current.emit('leave_auction', auctionDetail.auction_id);
          setJoin(false);
        }
      };
      
      const placeBid = async() => {
        await axios.post('http://localhost:5000/bids', {
          user_id:user.userId,
          auction_id:auctionDetail.auction_id,
          bid_amount:amount
        });
        if (amount !== 0) {
          const bidData = {
            auctionID: auctionDetail.auction_id,
            user: user.userId,
            amount
          };
          socketRef.current.emit('place_bid', bidData );
          setAmount(0);
        }
      };

    return(
    <>
          {(auctionDetail != null && user !== null)?(<>
                <Typography variant='h1'>Car Bidding System</Typography>
                <h1>{ `AuctionID ${auctionDetail.auction_id} for ${auctionDetail.car_id}`}</h1>
                <h2>{ `Hi ${user.username}`}</h2>
                {(!join)? (<Button variant="contained"sx={{width:"100px"}} onClick={e=>joinAuction()}>Join</Button>):<>
                <Box sx={{
                display:"flex",
                flexDirection:"row",
                flexWrap:"wrap",
                alignContent:"space-between"
              }}>
                <TextField type="number" label="Bit Amount" value={amount} onChange={e=>setAmount(e.target.value)}/>
                <Button variant="contained"sx={{margin:"10px"}} onClick={e=>placeBid()}>Bid</Button>
              </Box>
              <Button variant="contained"sx={{width:"100px" , margin:"30px"}} onClick={e=>leaveAuction()}>Leave</Button>
              </>}
              </>):(<><h1>Choose the desire Auction Room </h1></>)}
                
               

    </>)

};

export default AuctionRoom;