import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {  styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'



function QueuedSongList({ queue }) {
    console.log({ queue })
    const theme = useTheme();
    const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'))

    const song = {
        title: "LÜNE",
        artist: "MÖÖN",
        thumbnail: "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg"
      }

    return greaterThanMd  && (
        <div style={{ margin: '10px 0'}}>
            <Typography color="textSecondary" variant="button">
                QUEUE(5)
            </Typography>
            {Array.from({ length: 5}, () => song).map((song, i) => (
                <QueuedSong key={i} song={song} />
            ))}
        </div>
    )
}

function QueuedSong({ song }) {

// Styles

const SongAvatar = {
    width: 44,
    height: 44
}
 const Text = {
    textOverflow: "ellipsis",
    overflow: "hidden"
  }

  const Container = styled('div')({
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10
  })

  const SongInfoContainer = styled('div')({
    overflow: "hidden",
    whiteSpace: "nowrap"
  })

    const { thumbnail, artist, title } = song
    return (
        <Container>
            <Avatar sx={SongAvatar} src={thumbnail} alt="Song Thumbnail" />
            <SongInfoContainer>
                <Typography variant="subtitle" sx={Text}>
                    {title}
                </Typography>
                <Typography color="textSecondary" sx={Text}>
                    {artist}
                </Typography>
            </SongInfoContainer>
            <IconButton>
                <Delete color="error"  />
            </IconButton>
        </Container>
    )
}

export default QueuedSongList;