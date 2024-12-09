import { Button, Dialog, DialogTitle, TextField , Autocomplete , Box} from "@mui/material";
import { useState , useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const JoinAuction = (props)=>{
    
    const {open , handleClose , setAuctionDetail} = props;
    const navigate = useNavigate();
    

    const [options, setOptions] = useState([]);
    useEffect(() => {
        const fetchAuctions = async () => {
          try {
            const response = await axios.get('http://localhost:5000/auctions');
            setOptions(response.data);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchAuctions();
      }, []);

      const handleJoin = ()=>{
        handleClose();
        navigate("/room");
      }



    
    return(
    <>
        <Dialog
        open={open}
        onClose={handleClose}
        
        >
            <DialogTitle>Join Auction</DialogTitle>
            <Box sx={{
                display:"flex",
                flexDirection:"row",
                
            }}>
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.auction_id}
                    renderInput={(params) => <TextField {...params} label="Select an Option" variant="outlined" />}
                    onChange={(event, value) => setAuctionDetail(value)}
                    sx={{
                    width:"300px"
                    }}
                />
                
                <Button variant="contained" onClick={handleJoin}>Join</Button>

            </Box>
            


        </Dialog>
    </>)

};

export default JoinAuction;