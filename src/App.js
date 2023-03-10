import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import Grid from "@mui/material/Grid"; // Grid version 1
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import songReducer from './reducer';

// reference: https://beta.reactjs.org/reference/react/createContext
export const SongContext = React.createContext({
  song: {
    id: "1eb17ecf-867c-4fcf-9080-94fac655d806",
    title: "What do you Dream About?",
    artist: "Hello Meteor",
    thumbnail: "http://img.youtube.com/vi/KG9qLMR_V_E/0.jpg",
    url: "https://youtu.be/KG9qLMR_V_E",
    duration: 251
  },
  isPlaying: false
})

function App() {
  // reference: https://beta.reactjs.org/reference/react/useContext
  const initialSongState = React.useContext(SongContext)
  // reference https://beta.reactjs.org/reference/react/useReducer
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  const theme = useTheme();
  const greaterThanSm = useMediaQuery(theme.breakpoints.up('sm'))
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'))


  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {greaterThanSm && <Header /> }
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSm ? 80 : 10
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList /> 
        </Grid>
        <Grid style= {
          greaterThanMd ? {
          position: 'fixed',
          width: '100%',
          right: 20,
          top: 100
        } : {
          position: 'fixed',
          width: '100%',
          left: 0,
          bottom: 0
        }}
        item xs={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
