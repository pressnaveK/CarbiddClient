import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import axios from 'axios';


const Login = (props)=>{
    const {open , handleClose,setUser} = props;
    const [userID, setuserID] = useState("");
    const [password,setPassword]=useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/login', {
            user_id: userID, // user_id from user input
            password:password, // password from user input
          });
      
          const user = response.data; // Extract username from the response
          setUser(user);
          console.log(user);
          alert("Log in sucessful");

        } catch (err) {
          console.error('Login error:', err.response ? err.response.data : err.message); 
          alert("Login error :",err.response ? err.response.data : err.message);
          setUser(null);
        }
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
            <TextField label="UserID" value={userID} onChange={(e)=>setuserID(e.target.value)}/>
            <TextField type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleLogin}>Login</Button>


        </Dialog>
    </>)

};

export default Login;