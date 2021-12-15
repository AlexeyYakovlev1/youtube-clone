import React from 'react';
import {Avatar, Box, ListItem, Typography} from "@mui/material";
import propTypes from "prop-types";
import {NavLink} from "react-router-dom";

const VideoItem = ({ info, watch = false }) => {
    const [user, setUser] = React.useState({});
    const date = new Date(info.createdAt).toLocaleDateString();

    React.useEffect(() => {
        async function fetchUser() {
            const response = await fetch(`/api/users/${info.owner}`, {
                method: "GET",
                body: null
            })

            response.json().then(data => {
                setUser(data);
            })
        }

        fetchUser();
        // eslint-disable-next-line
    }, []);

    return (
        <ListItem
            sx={{
                width: "330px", 
                height: "290px", 
                display: "flex", 
                flexDirection: "column", 
                padding: 0
            }}
            style={{margin: `${!watch && "10px"}`}}
        >
            <NavLink to={`/watch/${info._id}`}>
                <Box sx={{
                    width: "330px", 
                    height: "160px", 
                    marginBottom: 2,
                    backgroundColor: `#202020`
                }}>
                    <video preload="auto" controls={false} width="100%" height="100%" muted={true} src={info.url}></video>
                </Box>
            </NavLink>
            
            <Box sx={{width: "100%", color: "#fff", display: "flex", alignItems: "flex-start"}}>
                <NavLink to={`/users/${user._id}`}>
                    <Avatar alt={user.name} src={user.avatar} sx={{marginRight: 2, width: "50px", height: "50px"}} />
                </NavLink>
                
                <Box>
                    <Typography className="video__title">{info.name}</Typography>

                    <Box sx={{color: "gray", fontSize: 14, marginTop: 1}}>
                        <Typography>
                            <NavLink to={`/user/${user._id}`}>{user.name}</NavLink>
                        </Typography>
                        <Box sx={{display: "flex"}}>
                            <Typography sx={{marginRight: 1}}>{info.watches} просмотров</Typography>
                            <Typography>{date}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ListItem>
    )
}

VideoItem.propTypes = {
    info: propTypes.object.isRequired,
    watch: propTypes.bool,
}

export default VideoItem;
