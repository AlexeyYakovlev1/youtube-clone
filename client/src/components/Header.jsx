import React from "react";
import {Avatar, Box, Button, Container, TextField, Typography} from '@mui/material';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import YouTube from '@mui/icons-material/YouTube';

const Header = () => {
	const user = useSelector(state => state.user.info);
	
	return (
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
					<Button variant="primary" sx={{color: "#fff", marginRight: 3}}>Добавить</Button>
					<NavLink to={`/user/${user._id}`}>
						<Avatar alt={user.name} src={user.avatar} />
					</NavLink>
				</Box>
			</Container>
		</Box>
	)
}

export default Header;