import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import axios from 'axios';



const Register = (props)=>{
    const {open , handleClose} = props;
    const [userName, setuserName] = useState("");
    const [userID, setuserID] = useState("");
    const [password,setPassword]=useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            user_id: userID,
            username: userName,
            password: password,
        }
    
        try {
          const response = await axios.post('http://localhost:5000/users', formData);
          alert(response.data.message);
        } catch (error) {
          if (error.response) {
            alert(error.response.data.message);
          } else {
            alert('An error occurred while creating the user.');
          }
          console.error('Error creating user:', error);
        }
        setuserName("");
        setuserID("");
        setPassword("");
        handleClose();

      };
    return(
    <>
        <Dialog
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>Register</DialogTitle>
            <TextField label="Name" value={userName} onChange={(e)=>setuserName(e.target.value)}/>
            <TextField label="UserID" value={userID} onChange={(e)=>setuserID(e.target.value)}/>
            <TextField type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleSubmit}>Register</Button>


        </Dialog>
    </>)

};

export default Register;