import React from 'react';
import {Box, Avatar, TextField, Button} from "@mui/material";
import propTypes from "prop-types";
import { addComment } from '../actions/CommentsAction';
import { useSelector } from 'react-redux';

const AddComment = ({user, videoId, setComments, setMessage}) => {
    const [text, setText] = React.useState("");
    const token = useSelector(state => state.user.token);

    return (
        <Box>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Avatar alt={user.name} src={user.avatar} sx={{marginRight: 2}} />
                <TextField 
                    className="addComment__input"
                    variant="outlined" 
                    value={text} 
                    onChange={event => setText(event.target.value)} 
                    placeholder="Оставьте комментарий"
                    sx={{width: "100%"}}
                />
            </Box>
            <Box sx={{textAlign: "right"}}>
                <Button 
                    sx={{marginTop: 2}} 
                    variant="contained" 
                    onClick={() => addComment(text, videoId, token, setMessage, setComments)}
                >Оставить комментарий</Button>
            </Box>
            
        </Box>
    )
}

AddComment.propTypes = {
    user: propTypes.object.isRequired,
    videoId: propTypes.string.isRequired,
    setMessage: propTypes.func.isRequired,
    setComments: propTypes.func.isRequired
}

export default AddComment;
