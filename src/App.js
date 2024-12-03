import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button, TextField, Typography, Paper, Grid, Box } from '@mui/material';
import MemeVotingABI from './MemeVotingABI.json';
import './App.css';

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

const App = () => {
  const [memes, setMemes] = useState([]);
  const [newMemeURL, setNewMemeURL] = useState('');
  const [account, setAccount] = useState(null);

  // useEffect(() => {
  //   fetchMemes();
  // }, [fetchMemes]);  

  // useEffect(() => {
  //   if (window.ethereum) {
  //     fetchMemes();
  //   }
  // }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]); // Assuming you have a `setAccount` state setter
      } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  

  // const getContract = () => {
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   const signer = provider.getSigner();
  //   return new ethers.Contract(CONTRACT_ADDRESS, MemeVotingABI, signer);
  // };

  // const fetchMemes = async () => {
  //   const contract = getContract();
  //   const memeCount = await contract.getMemeCount();
  //   const memesArray = [];

  //   for (let i = 0; i < memeCount.toNumber(); i++) {
  //     const meme = await contract.memes(i);
  //     memesArray.push({ id: i, url: meme.url, votes: meme.votes.toNumber() });
  //   }

  //   setMemes(memesArray);
  // };

     const submitMeme = async () => {
  //   if (!newMemeURL) return;
  //   const contract = getContract();
  //   const tx = await contract.submitMeme(newMemeURL);
  //   await tx.wait();
  //   setNewMemeURL('');
  //   fetchMemes();
      alert("Meme submitted (placeholder function)!");
     };

     const voteForMeme = async (memeId) => {
  //   const contract = getContract();
  //   const tx = await contract.voteForMeme(memeId);
  //   await tx.wait();
  //   fetchMemes();
       alert(`Voted for Meme ID ${memeId} (placeholder function)!`);
     };

  return (
    <div>
      <header className="header">MemeVerse</header>

      <Box textAlign="center" mt={3}>
        {!account ? (
          <Button variant="contained" color="primary" onClick={connectWallet}>
            Connect Wallet
          </Button>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Connected: {account}
          </Typography>
        )}
      </Box>

      <div className="content">
        <Typography variant="h5" gutterBottom>
          Submit a Meme
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter Meme URL"
          value={newMemeURL}
          onChange={(e) => setNewMemeURL(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={submitMeme}
          style={{ marginTop: '10px' }}
        >
          Submit
        </Button>
      </div>

      <div className="content">
        <Typography variant="h5" gutterBottom>
          Meme Leaderboard
        </Typography>
        <Grid container spacing={2}>
          {memes.map((meme) => (
            <Grid item xs={12} key={meme.id}>
              <Paper style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                <img src={meme.url} alt={`Meme ${meme.id}`} className="meme-image" />
                <Typography variant="body1" style={{ flexGrow: 1 }}>
                  Votes: {meme.votes}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => voteForMeme(meme.id)}
                >
                  Vote
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default App;
