import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { FormHelperText, FormControl } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const CreateRoomPage = () => {
    const defaultVotes = 2;
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    const navigate = useNavigate();

    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    };

    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === 'true');
    };

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };

        fetch('/apihome/', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create room');
                }
                return response.json();
            })
            .then((data) => {
                if (data.code === undefined) {
                    return;
                }
                navigate(`/room/${data.code}`);
                // toast.success('Room created successfully!'); // Show a success toast
            })
            .catch((error) => {
                console.log(error);
                // toast.error('An error occurred.'); // Show an error toast
            });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create A Room
                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">Guest Control of Playback State</div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
                        <FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom" />
                        <FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        onChange={handleVotesChange}
                        required={true}
                        type="number"
                        defaultValue={defaultVotes}
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                    />
                    <FormHelperText>
                        <div align="center">Votes Required to Skip Song</div>
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <Button onClick={handleRoomButtonPressed} color="primary" variant="contained">
                    Create Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
            {/* <ToastContainer /> */}
        </Grid>
    );
};

export default CreateRoomPage;
