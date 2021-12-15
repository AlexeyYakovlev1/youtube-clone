import React from "react";
import {Alert, Box, List, CircularProgress} from '@mui/material';
import VideoItem from "../components/VideoItem";

const Home = () => {
	const [loading, setLoading] = React.useState(false);
	const [videos, setVideos] = React.useState([]);
	const [message, setMessage] = React.useState({
		text: "", type: ""
	});

	React.useEffect(() => {
		async function fetchVideos() {
			try {
				setLoading(true);
				const response = await fetch("/api/videos", {
					method: "GET"
				})

				response.json().then(data => {
					setLoading(false);
					if (!response.ok) {
						return setMessage({
							text: data.message, type: "error"
						})
					}
					setVideos(data.findVideos);
				})
			} catch(e) {
				console.log(e);
				setLoading(false);
				setMessage({
					text: e.message, type: "error"
				});
			}
		}

		fetchVideos();
	}, []);

	return (
		<>
			{message.text && <Alert sx={{marginBottom: 1, marginTop: 1}} severity={message.type}>{message.text}</Alert>}
			<Box>
				{loading && <CircularProgress />}
				<List sx={{display: "flex", flexWrap: "wrap", alignItems: "flex-start"}}>
					{videos.map(video => {
						return (
							<VideoItem key={video._id} info={video} />
						)
					})}
				</List>
			</Box>
		</>
	)
}

export default Home;