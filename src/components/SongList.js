import React from "react";
import { Typography, Card, CardContent, CardMedia, CircularProgress, CardActions, IconButton } from "@mui/material";
import { PlayArrow, Pause, Save } from "@mui/icons-material";
import {  styled } from '@mui/system';
// import { GET_SONGS } from "../graphql/queries";
import { GET_SONGS } from "../graphql/subscriptions";
// import { useQuery } from "@apollo/client";
import { useSubscription } from "@apollo/client";
// import useQuery from "apollo-client";
import { SongContext } from '../App';


function SongList() {
//   let loading = false;
// const { data, loading, error } = useQuery(GET_SONGS)
const { data, loading, error } = useSubscription(GET_SONGS)

//   const song = {
//     title: "LÜNE",
//     artist: "MÖÖN",
//     thumbnail: "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg"
//   }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (error) return `${error}`
  // there is a map function in Array.from
//   return <div>{Array.from({ length: 10 }, () => song).map((song, i) => (
//     <Song key={i} song={song} />
    return (
        <div>
            {data.songs.map(song => (
                <Song key={song.id} song={song} />
            ))}
        </div>
    );
}

const container = {
    spacing: 1
}

const SongInfoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
})
const SongInfo= styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
})

const songThumbnail = {
    objectFit: 'cover',
    width: 140,
    height: 140
}

function Song( { song }) {
    const { title, artist, thumbnail }  = song
    const { state, dispatch } = React.useContext(SongContext);
    const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false);
    // make sure only the appropriate song's buttons work
    // make sure the current song that selected and the song in the left pane have the same controls
    React.useEffect(() => {
      const isSongPlaying = state.isPlaying &&  song.id === state.song.id;
      setCurrentSongPlaying(isSongPlaying);
    }, [state.isPlaying, song.id, state.song.id])
    function handleTogglePlay() {
        dispatch({ type: "SET_SONG", payload: { song }})
        dispatch(state.isPlaying ? { type: "PAUSE_SONG"} : { type: "PLAY_SONG" })
      }
    return ( 
    <Card sx={{container, m: 3}}>
        <SongInfoContainer>
            <CardMedia sx={songThumbnail} image={thumbnail}/>
            <SongInfo>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body1" component="p" color="textSecondary">
                        {artist}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={handleTogglePlay} size="small" color="primary">
                       {currentSongPlaying ? <Pause /> : <PlayArrow /> }
                    </IconButton>
                    <IconButton size="small" color="secondary">
                        <Save color="secondary"/>
                    </IconButton>
                </CardActions>
            </SongInfo>
        </SongInfoContainer>
    </Card>
    )
}
export default SongList;
