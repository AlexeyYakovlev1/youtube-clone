import React from "react";
import {Alert, Avatar, Box, Button, Container, TextField, Typography} from '@mui/material';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../components/MyModal.jsx";
import {Close, FileUpload, YouTube} from '@mui/icons-material';
import {addVideo} from "../actions/VideosAction";

const Header = () => {
	const [loading, setLoading] = React.useState(false);
	const dispatch = useDispatch();
	const user = useSelector(state => state.user.info);
	const [open, setOpen] = React.useState(false);
	const inputRef = React.useRef();
	const [message, setMessage] = React.useState({
		text: "", type: ""
	})

	return (
		<>
			{message.text && <Alert severity={message.type}>{message.text}</Alert>}
			<MyModal open={open} setOpen={setOpen}>
				<Box>
					<Box sx={{
						display: "flex", 
						justifyContent: "space-between", 
						alignItems: "center", 
						borderBottom: "1px solid grey",
						padding: 3,
						marginBottom: 2
					}}>
						<Typography sx={{fontSize: 18}}>Загрузка видео</Typography>
						<Close sx={{cursor: "pointer"}} onClick={() => setOpen(false)} />
					</Box>

					<Box sx={{textAlign: "center", padding: 10}}>
						<FileUpload sx={{color: "lightgrey", width: 136, height: 136, marginBottom: 5}} />
						<Typography>Нажмите на кнопку ниже, чтобы выбрать файл на компьютере.</Typography>
						<input type="file" ref={inputRef} onChange={(event) => dispatch(addVideo(event, setMessage, setLoading))} style={{display: "none"}} />
						<Button variant="contained" sx={{marginTop: 3}} onClick={() => inputRef.current.click()} disabled={loading}>Выбрать файлы</Button>
					</Box>
				</Box>
			</MyModal>
			<Box sx={{
				backgroundColor: "#202020", 
				padding: 1, 
				borderBottom: "1px solid grey", 
				marginBottom: 2,
				position: "sticky",
				top: 0,
				zIndex: 99	
			}}>
				<Container maxWidth="lg" sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
					<NavLink to="/">
						<Typography sx={{color: "#fff", fontSize: 22, fontWeight: "bold", display: "flex", alignItems: "center"}}>
							Youtube
							<YouTube sx={{marginLeft: 1, color: "#FF0000"}} />
						</Typography>
					</NavLink>
					<TextField 
						variant="outlined" 
						placeholder="Введите запрос" 
						sx={{width: "50%"}}
						InputProps={{
							style: {color: "#fff"}
						}}
					/>
					<Box sx={{display: "flex"}}>
						<Button variant="primary" sx={{color: "#fff", marginRight: 3}} onClick={() => setOpen(true)}>Добавить</Button>
						<NavLink to={`/user/${user._id}`}>
							<Avatar alt={user.name} src={user.avatar} />
						</NavLink>
					</Box>
				</Container>
			</Box>
		</>
	)
}

export default Header;