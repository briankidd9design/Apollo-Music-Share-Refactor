import React from 'react';
import QueuedSongList from './QueuedSongList';
import { Typography, Card, IconButton, Slider, CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import {  styled } from '@mui/system';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';
import { SongContext } from '../App';
import { useQuery } from "@apollo/client";
import { GET_QUEUED_SONGS } from '../graphql/queries';


function SongPlayer() {
   const { data } = useQuery(GET_QUEUED_SONGS)

    // destructuring state from the songContext 
  const { state, dispatch } = React.useContext(SongContext)

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG"} : { type: "PLAY_SONG" })
  }

    const container = {
        display: 'flex',
        justifyContent: 'space-between'
    }
    
    const Details = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px'
    })

    const content = {
        flex: '1 0 auto'
    }
    const thumbnail = {
        width: 150
    }

    const Controls = styled('div')({
        display: "flex",
        alignItems: "center",
        spacing: 1
    })

    const playIcon = {
        height: 38,
        width: 38
    }
    const pauseIcon = {
        height: 38,
        width: 38
    }

    return (
        <>
            <Card varient="outlined" sx={container}>
                <Details>
                    <CardContent sx={content}>
                        <Typography variant="h5" component="h3">
                            {/* Title */}
                            {state.song.title}
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <Controls sx={{pl: 1, pr: 1}}>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handleTogglePlay}>
                          {state.isPlaying ? <Pause sx={pauseIcon}/> : <PlayArrow sx={playIcon}/>}
                        </IconButton>
                        <IconButton>
                           <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            00:01:30
                        </Typography>
                    </Controls>
                    <Slider
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                     />
                </Details>
                <CardMedia 
                    image={state.song.thumbnail}
                    sx={thumbnail}
                />
            </Card>
            <QueuedSongList queue={data.queue}  />
        </>
    )
}

export default SongPlayer;