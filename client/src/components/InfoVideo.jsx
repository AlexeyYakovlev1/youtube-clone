import React from 'react';
import {Alert, Box, Button, TextField, Typography, CircularProgress} from "@mui/material";
import propTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { addVideo } from '../actions/VideosAction';
import {useSelector} from "react-redux";

const InfoVideo = ({urlVideo}) => {
    const token = useSelector(state => state.user.token);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState({
        text: "", type: ""
    })
    const dispatch = useDispatch();
    const [info, setInfo] = React.useState({
        name: "", description: "", url: urlVideo
    })

    return (
        <>
            {message.text && <Alert severity={message.type}>{message.text}</Alert>}
            <Box sx={{
                padding: 3
            }}>
                <Typography sx={{fontSize: 18}}>Заполните информацию для видео</Typography>

                <Box sx={{marginTop: 2}}>
                    <TextField
                        InputProps={{
                            style: {color: "#fff"}
                        }}
                        sx={{marginBottom: 2, width: "100%"}}
                        variant="outlined" 
                        label="Название видео"
                        value={info.name}
                        onChange={event => setInfo({...info, name: event.target.value})}
                    />
                    <TextField
                        InputProps={{
                            style: {color: "#fff"}
                        }}
                        sx={{marginBottom: 2, width: "100%"}}
                        variant="outlined" 
                        label="Описание видео"
                        value={info.description}
                        onChange={event => setInfo({...info, description: event.target.value})}
                    />
                    <Button 
                        disabled={loading}
                        variant="contained" 
                        onClick={() => dispatch(addVideo(info, token, setMessage, setLoading))}
                    >Опубликовать</Button>
                    {loading && <CircularProgress/>}
                </Box>
            </Box>
        </>
    )
}

InfoVideo.propTypes = {
    urlVideo: propTypes.string.isRequired
}

export default InfoVideo;
