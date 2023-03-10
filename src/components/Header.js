import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeadsetIcon from '@mui/icons-material/Headset';
import Box from '@mui/material/Box';




// const theme = createTheme(theme => ({
//     title: {
//         marginLeft: theme.spacing(2)
//     }
//   }));

function Header() {
    // const classes = useStyles();
    return (
        <div>
    <AppBar color="primary" position="fixed">
      <Toolbar>
        <HeadsetIcon />
      <Box ml={2} >
      {/* component is the underlying style */}
        <Typography varient="h6" component="h1">
          Apollo Music Share
        </Typography>
    </Box>
      </Toolbar>
    </AppBar>
        </div>
    )
}

export default Header;