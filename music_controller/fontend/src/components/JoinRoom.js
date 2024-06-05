import React from 'react';
import { useState } from 'react';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';



const JoinRoom = () => {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');

    const _handleRoomCodeChange = (e) => {
        setRoomCode(e.target.value);
    }

    const _handelEnterRoomBtn = () => {
        fetch('/api/join-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: roomCode
            })
        }).then((response) => {
            if (response.ok) {
                window.location.href = `/room/${roomCode}`;
            } else {
                setError('Room not found');
            }
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <FormHelperText>
                        <div align="center">
                            Enter the code of the room you want to join
                        </div>
                    </FormHelperText>
                    <TextField
                        error={error}
                        label="Code"
                        placeholder="Enter a Room Code"
                        helperText={error}
                        value={roomCode}
                        onchange={_handleRoomCodeChange}
                        // variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={_handelEnterRoomBtn}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
};

export default JoinRoom;