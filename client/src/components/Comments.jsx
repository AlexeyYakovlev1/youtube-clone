import React from 'react'
import {Box, List, Typography} from "@mui/material";
import AddComment from "./AddComment";
import propTypes from "prop-types";
import CommentItem from './CommentItem';

const Comments = ({length, currentUser, videoId, setComments, setMessage, comments}) => {
    return (
        <Box sx={{marginTop: 2, marginBottom: 2,}}>
            <Box sx={{marginBottom: 2}}>
                <Typography sx={{color: "#fff", marginBottom: 2}}>{length} комментариев</Typography>
                <AddComment user={currentUser} videoId={videoId} setComments={setComments} setMessage={setMessage} />
            </Box>
            <List sx={{padding: 0, margin: 0}}>
                {comments.length ? comments.map(comment => {
                    return (
                        <CommentItem key={comment._id} info={comment} />
                    )
                }) : false}
            </List>
        </Box>
    )
}

Comments.propTypes = {
    length: propTypes.number.isRequired,
    currentUser: propTypes.object.isRequired,
    videoId: propTypes.string.isRequired,
    setMessage: propTypes.func.isRequired,
    setComments: propTypes.func.isRequired,
    comments: propTypes.array.isRequired
}

export default Comments
