import React from 'react';
import {Avatar, Box, Button, List, Typography, CircularProgress} from "@mui/material";
import {useParams, useHistory} from "react-router-dom";
import VideoItem from '../components/VideoItem';
import {useSelector} from "react-redux";

const User = () => {
    const [videos, setVideos] = React.useState([]);
    const [user, setUser] = React.useState({});
    const userId = useParams().id;
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const currentUserId = useSelector(state => state.user.info._id);

    React.useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/users/${userId}`, {
                    method: "GET",
                    body: null
                })

                response.json().then(data => {
                    if (!response.ok) {
                        console.log(data.message);
                        return history.push("/");
                    }

                    setUser(data);
                })
            } catch(e) {
                console.log(e);
                history.push('/');
            }   
        }

        fetchUser();
        // eslint-disable-next-line
    }, [userId]);

    React.useEffect(() => {
        async function fetchVideos() {
            try {
                setLoading(true);
                const response = await fetch(`/api/videos/owner/${userId}`, {
                    method: "GET",
                    body: null
                })

                response.json().then(data => {
                    setLoading(false);
                    setVideos(data.findVideo);
                })
            } catch(e) {
                setLoading(false);
                console.log(e);
            }   
        }

        fetchVideos();
        // eslint-disable-next-line
    }, [userId]);

    return (
        <Box>
            <Box sx={{
                display: "flex", 
                justifyContent: "space-between",
                backgroundColor: "#181818",
                padding: 1,
                alignItems: "center"
            }}>
                <Box sx={{color: "#fff", display: "flex", alignItems: "center"}}>
                    <Avatar alt={user.name} src={user.avatar} sx={{width: 100, height: 100}} />
                    <Typography sx={{fontSize: 24, marginLeft: 3}}>{user.name}</Typography>
                </Box>

                <Box>
                    {currentUserId === userId ? <Button variant="contained">Настройки</Button> :
                    <Button variant="contained">Подписаться</Button>}
                </Box>
            </Box>

            <Box sx={{marginTop: 5}}>
                {loading && <CircularProgress />}
                <List sx={{display: "flex", flexWrap: "wrap", alignItems: "flex-start"}}>
                    {videos.map(video => {
                        return (
                            <VideoItem key={video._id} info={video} />
                        )
                    })}
                </List>
            </Box>
        </Box>
    )
}

export default User;
