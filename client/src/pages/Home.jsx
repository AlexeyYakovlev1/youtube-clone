import React from "react";
import {Box, List, Typography} from '@mui/material';
import VideoItem from "../components/VideoItem";
import ImageStock from "../components/image.png";
import MyModal from "../components/MyModal.jsx";

const Home = () => {
	const [videos, setVideos] = React.useState([{
		title: "Grim Dawn - Кузнецы | Гайд",
		description: `Про второй сверхсекретный квест:
		https://youtu.be/7Q_QTLuTMLo
		▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
		✔ Реквизиты для пожертвований:
		https://www.donationalerts.com/r/inqu...
		◄Заранее благодарен любой поддержке►
		▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
		✔ Если вдруг появилось желание порадовать меня, подарив какую-нибудь игру, или просто захотелось зачем-то добавить меня в друзья, добро пожаловать:
		►http://steamcommunity.com/id/EysProfe...
		▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
		• Если понравилось видео -  поддержите лайком, это помогает увидеть контент большему количеству людей. И, конечно, подписывайтесь на канал.
		• Пообщаться можно тут: https://discord.gg/t5mAr4Z
		• Не забудьте посетить группу ВК: https://vk.com/inquisitorofarts
		• А так же лайв канал: https://www.youtube.com/channel/UCqPp...
		• И Twitch канал: https://www.twitch.tv/inquisitorofarts`,
		url: ImageStock,
		owner: "61b48780f0adf2e3a32744e8",
		_id: "23894klsdns",
		watches: 213,
		date: "13.12.2021"
	}]);
	const [open, setOpen] = React.useState(true); //DEBUG

	return (
		<>
			<MyModal open={open} setOpen={setOpen}>
				<Box>
					
				</Box>
			</MyModal>
			<Box>
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