import React, { useState } from 'react';
import './App.css';
import AuctionRoom from './AuctionRoom';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App = () => {
  const [user, setUser] = useState(null);
  const [auctionID, setAuctionID] = useState('');
  const [auctionDetail, setAuctionDetail] = useState(null);
  const [join,setJoin]=useState(false);
  
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home
                                      user={user}
                                      setAuctionDetail={setAuctionDetail}
                                      auctionID={auctionID}
                                      setAuctionID={setAuctionID}
                                      setUser={setUser}
                                      join={join}
  
/>} />
        
        <Route path="/room" element={<AuctionRoom
                              auctionDetail={auctionDetail}
                              auctionID={auctionID}
                              user={user}
                              join={join}
                              setJoin={setJoin}
                            />} />
       
      </Routes>
    </Router>
     
      
    </div>
  );
};

export default App;