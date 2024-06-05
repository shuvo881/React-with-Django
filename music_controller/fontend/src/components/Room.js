import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [isHost, setIsHost] = useState(false);

    const { roomCode } = useParams();

    const getRoomDetails = () => {
        

        fetch(`/apihome?code=${roomCode}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                
                
                setVotesToSkip(data[0]['votes_to_skip']);
                setGuestCanPause(data[0]['guest_can_pause']);
                setIsHost(data[0]['is_host']);

            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    useEffect(() => {
        getRoomDetails();
    }, [roomCode]);
    
    return (
        <div>
            <h1>{roomCode}</h1>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
};

export default Room;
