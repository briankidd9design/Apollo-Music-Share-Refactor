import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material/";
// import { spacing } from '@mui/system';
import { styled } from "@mui/system";
import { AddBox } from "@mui/icons-material";
// import { makeStyles } from "@mui/styles";
import { Link } from "@mui/icons-material";
// import { red } from "@mui/material/colors";
import ReactPlayer from "react-player";
import SoundcloudPlayer from "react-player/lib/players/SoundCloud";
import YoutubePlayer from "react-player/lib/players/YouTube";

import { useMutation } from "@apollo/react-hooks";
// import { onError } from "apollo-link-error";
import { ADD_SONG } from "../graphql/mutations";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
});

const dialogStyles = {
  textAlign: "center",
};
const thumbnailStyle = {
  width: "90%",
};

const ThumbnailContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const DEFAULT_SONG = {
  duration: 0,
  title: "",
  artist: "",
  thumbnail: "",
};

function AddSong() {
  // we add the addSong mutate function
  // we can use the error object from the useMutation hook to get error data
  // since it is in the parent scope, it will be made available to the entire component
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [dialog, setDialog] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [playable, setPlayable] = React.useState(false);
  const [song, setSong] = React.useState({DEFAULT_SONG});

  React.useEffect(() => {
    // if Soundcloud can play this file it will return a value of true
    const isPlayable =
      SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  function handleChangeSong(event) {
    const { name, value } = event.target;
    // This pattern is the way we update any object in state: We spread in the previous state and update the property or properties we need to at a given point in time
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  }
  function handleSetDialog() {
    setDialog(false);
  }
  function handleCloseDialog() {
    setDialog(false);
  }
  // this data comes from ReactPlayer and you can learn more about ReactPlayer herehttps://www.npmjs.com/package/react-player
  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
      // this is for a Soundcloud link
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundcloudInfo(nestedPlayer);
    }
    // spreading in the songData object and the url as a property
    setSong({ ...songData, url });
  }

  async function handleAddSong() {
    try {
      const { url, thumbnail, duration, title, artist } = song;

      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      handleCloseDialog();
      // this will clear out the song data in the add song modal
      setSong({ DEFAULT_SONG });
      setUrl('')
    } catch (error) {
      console.error("Error adding song", error);
    }
  }
  // This function uses ReactPlayer to get song info for YouTube link
  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  }
  // This function uses ReactPlayer to get song info for a Soundcloud link
  function getSoundcloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  }
  // Destucture the song state so that you can then provide all the data of the song to the different text fields

  function handleError(field) {
    // the ? is a chaining operator. For every property or object where we are checking to see if it exists first, before grabbing the property within it, we can add a question mark before the period. This can take the place of return error && error.graphQLErrors[0].extensions.path.includes(field);
    return error?.graphQLErrors[0]?.extensions?.path.includes(field);
  }

  const { thumbnail, title, artist } = song;
  // console.dir will give you the entire error object
// console.dir(error);
  return (
    <Container>
      <Dialog sx={dialogStyles} open={dialog} onClose={handleSetDialog}>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <ThumbnailContainer>
            <img src={thumbnail} alt="Song thumbnail" sx={thumbnailStyle} />
          </ThumbnailContainer>
          <TextField
            value={title}
            onChange={handleChangeSong}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleError('title')}
            helperText={handleError('title') && 'Fill out field'}
          />
          <TextField
            value={artist}
            onChange={handleChangeSong}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleError('artist')}
            helperText={handleError('artist') && 'Fill out field'}
          />
          <TextField
            value={thumbnail}
            onChange={handleChangeSong}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            error={handleError('thumbnail')}
            helperText={handleError('thumbnail') && 'Fill out field'}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleAddSong} variant="outlined" color="primary">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>

      <TextField
        className="add-song"
        onChange={(event) => setUrl(event.target.value)}
        value={url}
        placeholder="Add Youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!playable}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBox />}
      >
        Add
      </Button>
      {/* onReady will provice all of the song data from the url so that we can enter it to add a new song to our player */}
      <ReactPlayer url={url} hidden={true} onReady={handleEditSong} />
    </Container>
  );
}

export default AddSong;
