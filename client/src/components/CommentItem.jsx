import React from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const CommentItem = ({info}) => {
    const [user, setUser] = React.useState({});
    const date = new Date(info.createdAt).toLocaleDateString();

    React.useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/users/${info.owner}`, {
                    method: 'GET'
                })

                response.json().then(data => {
                    setUser(data);
                })
            } catch(e) {
                console.log(e);
            }
        } 

        fetchUser();
    }, [info.owner]);

    return (
        <Box sx={{color: "#fff", display: "flex", marginBottom: 2, width: "100%"}}>
            <Avatar alt={user.name} src={user.avatar} sx={{marginRight: 2}} />
            
            <Box sx={{color: "#fff"}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Typography sx={{marginRight: 1}}>
                        <NavLink to={`/user/${user._id}`}>{user.name}</NavLink>
                    </Typography>
                    <Typography sx={{fontSize: "14px", color: "grey !important"}}>{date}</Typography>
                </Box>

                <Typography sx={{marginTop: 1}}>{info.text}</Typography>
            </Box>
        </Box>
    )
}

export default CommentItem;
