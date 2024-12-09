import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import axios from 'axios';


const CreateAuction = (props)=>{
    const {open , handleClose} = props;
    const [carID, setCarID] = useState("");
    const [auctionID, setAuctionID] = useState("");
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); 
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
    
        // Format to "YYYY-MM-DDTHH:mm"
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const [start, setStart] = useState(getCurrentDateTime());
    const [end, setEnd]= useState(getCurrentDateTime());

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            auction_id: auctionID,
            car_id: carID,
            start_datetime: start,
            end_datetime: end,
        }
    
        try {
          const response = await axios.post('http://localhost:5000/auctions', formData);
          alert(response.data.message);
        } catch (error) {
          console.error('Error creating auction:', error);
          alert('Failed to create auction');
        }
        setAuctionID("");
        setCarID("");
        handleClose();
      };
    return(
    <>
        <Dialog
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>Create Auction</DialogTitle>
            <TextField sx={{margin:"10px"}} label="Auction ID" value={auctionID} onChange={(e)=>setAuctionID(e.target.value)}/>
            <TextField sx={{margin:"10px"}} label="Car ID" value={carID} onChange={(e)=>setCarID(e.target.value)}/>
            <TextField sx={{margin:"10px"}} type="datetime-local"  label="Start" value={start} onChange={(e)=>setStart(e.target.value)}/>
            <TextField sx={{margin:"10px"}} type="datetime-local"  label="End" value={end} onChange={(e)=>setEnd(e.target.value)}/>
            <Button onClick={handleSubmit}>Create</Button>


        </Dialog>
    </>)

};

export default CreateAuction;