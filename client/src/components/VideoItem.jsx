import React from 'react';
import {Avatar, Box, ListItem, Typography} from "@mui/material";
import propTypes from "prop-types";
import {NavLink} from "react-router-dom";

const VideoItem = ({ info }) => {
    const [user, setUser] = React.useState({});

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
        <ListItem sx={{width: "350px", height: "290px", display: "flex", flexDirection: "column", margin: 1, padding: 0}}>
            <NavLink to={`/watch/${info._id}`}>
                <Box sx={{width: "350px", height: "160px", marginBottom: 2, backgroundImage: `url(${info.url})`, backgroundPosition: "center", backgroundSize: "cover"}}>
                    <video preload="auto" controls={false} width="100%" height="100%" muted={true}>
                        <source src={info.url} />
                    </video>
                </Box>
            </NavLink>
            
            <Box sx={{width: "100%", color: "#fff", display: "flex", alignItems: "flex-start"}}>
                <NavLink to={`/users/${user._id}`}>
                    <Avatar alt={user.name} src={user.avatar} sx={{marginRight: 2, width: "50px", height: "50px"}} />
                </NavLink>
                
                <Box>
                    <Typography className="video__title">{info.title}</Typography>

                    <Box sx={{color: "gray", fontSize: 14, marginTop: 1}}>
                        <Typography>{user.name}</Typography>
                        <Box sx={{display: "flex"}}>
                            <Typography sx={{marginRight: 1}}>{info.watches} просмотров</Typography>
                            <Typography>{info.date}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ListItem>
    )
}

VideoItem.propTypes = {
    info: propTypes.object.isRequired
}

export default VideoItem;
