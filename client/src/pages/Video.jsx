import React from 'react'
import {Box, List, CircularProgress, Typography, Button, Alert} from "@mui/material";
import {useHistory, useParams} from "react-router-dom";
import VideoItem from "../components/VideoItem";
import ChannelItem from "../components/ChannelItem";
import {useSelector} from "react-redux";
import Comments from "../components/Comments";

const Video = () => {
    const currentUser = useSelector(state => state.user.info);
    const currentUserId = currentUser._id;
    const [loading, setLoading] = React.useState(false);
    const videoId = useParams().id;
    const [video, setVideo] = React.useState({});
    const [user, setUser] = React.useState({});
    const [allVideos, setAllVideos] = React.useState([]);
    const history = useHistory();
    const [message, setMessage] = React.useState({
        text: "", type: ""
    })
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/users/${video.owner}`, {
                    method: "GET"
                })

                response.json().then(data => {
                    setUser(data);
                })
            } catch(e) {
                console.log(e);
                history.push("/");
            }
        }

        video.owner && fetchUser();
        // eslint-disable-next-line
    }, [video.owner])

    React.useEffect(() => {
        async function fetchVideo() {
            try {
                setLoading(true);
                const response = await fetch(`/api/videos/${videoId}`, {
                    method: "GET"
                })

                response.json().then(data => {
                    setLoading(false);
                    setVideo(data.findVideo);
                })
            } catch(e) {
                setLoading(false);
                console.log(e);
                history.push("/");
            }
        }

        fetchVideo();
        // eslint-disable-next-line
    }, [videoId]);

    const date = new Date(video.createdAt).toLocaleDateString();

    React.useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await fetch(`/api/videos`, {
                    method: "GET"
                })

                response.json().then(data => {
                    setAllVideos(data.findVideos);
                })
            } catch(e) {
                console.log(e);
                setAllVideos([]);
            }
        }

        fetchVideos();
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch(`/api/comments/video/${videoId}`, {
                    method: "GET"
                })
        
                response.json().then(data => {
                    setComments(data.findComments);
                })
            } catch(e) {
                console.log(e);
            }
        }

        fetchComments();
        // eslint-disable-next-line
    }, [videoId]);

    return (
        <Box sx={{display: "flex", alignItems: "flex-start"}}>
            {loading && <CircularProgress />}
            <Box sx={{width: "100%"}}>
                <Box sx={{marginBottom: 2, borderBottom: "1px solid grey", paddingBottom: 2}}>
                    <Box sx={{height: "570px", marginBottom: 2}}>
                        <video width="100%" height="100%" controls={true} src={video.url} autoPlay></video>
                    </Box>
                    <Box sx={{color: "#fff"}}>
                        <Typography sx={{fontSize: 18}}>{video.name}</Typography>
                        <Box sx={{display: "flex", justifyContent: "space-between", marginTop: 2}}>
                            <Box sx={{display: "flex", alignItems: "center", fontSize: 14, color: "grey"}}>
                                <Typography>{video.watches} просмотров</Typography>
                                <Typography sx={{marginLeft: 1}}>{date} г.</Typography>
                            </Box>
                            <Box>
                                <Button variant="primary">Нравится</Button>
                                <Button variant="primary">Не нравиться</Button>
                                <Button variant="primary">Поделиться</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{paddingBottom: 2, borderBottom: "1px solid grey"}}>
                    <ChannelItem info={user} currentUserId={currentUserId} />
                    <Typography sx={{marginTop: 2, color: "#fff"}}>{video.description}</Typography>
                </Box>

                {message.text && <Alert severity={message.type}>{message.text}</Alert>}
                <Comments 
                    length={comments.length} 
                    currentUser={currentUser}
                    videoId={videoId} 
                    setComments={setComments} 
                    setMessage={setMessage}
                    comments={comments || []}
                />
            </Box>

            <Box>
                <List sx={{width: 350, padding: 0, marginLeft: 2}}>
                    {allVideos.map(video => {
						return (
							<VideoItem key={video._id} info={video} watch={true} />
						)
					})}
                </List>
            </Box>
        </Box>
    )
}

export default Video
