import React from "react";
import {Box, Typography, TextField, Button, Alert} from '@mui/material';
import { login, register } from "../actions/AuthAction";
import {useDispatch} from "react-redux";

const Auth = () => {
	const dispatch = useDispatch();
	const [userReg, setUserReg] = React.useState({
		name: "", email: "", password: ""
	});
	const [userLog, setUserLog] = React.useState({
		email: "", password: ""
	});
	const [message, setMessage] = React.useState({
		text: "", type: ""
	})

	return (
		<>
			{message.text && <Alert sx={{marginTop: 1, marginBottom: 1}} severity={message.type}>{message.text}</Alert>}
			<Box sx={{
				marginTop: 5, 
				display: "flex", 
				alignItems: "center", 
				justifyContent: "center"
			}}>
				<Box sx={{
					display: "flex", 
					alignItems: "center", 
					flexDirection: "column", 
					marginRight: 5,
					backgroundColor: "#202020",
					padding: 2, 
					color: "#fff",
					borderRadius: 1,
					border: "1px solid lightgrey"
				}}>
					<Typography sx={{marginBottom: 2, fontSize: 20}}>Регистрация</Typography>
					<TextField
						InputProps={{
							style: {color: "#fff"}
						}}
						variant="outlined"
						sx={{marginBottom: 2}}
						placeholder="Имя" 
						value={userReg.name}
						onChange={event => setUserReg({...userReg, name: event.target.value})} 
					/>
					<TextField 
						InputProps={{
							style: {color: "#fff"}
						}}
						variant="outlined"
						sx={{marginBottom: 2}}
						placeholder="Почта" 
						value={userReg.email}
						onChange={event => setUserReg({...userReg, email: event.target.value})} 
					/>
					<TextField 
						InputProps={{
							style: {color: "#fff"}
						}}
						variant="outlined"
						placeholder="Пароль" 
						type="password"
						sx={{marginBottom: 2}}
						value={userReg.password}
						onChange={event => setUserReg({...userReg, password: event.target.value})} 
					/>
					<Button sx={{marginTop: 3, color: "#fff"}} variant="primary" onClick={() => register(userReg, setMessage)}>Зарегистрироваться</Button>
				</Box>
				<Box sx={{
					display: "flex", 
					alignItems: "center", 
					flexDirection: "column",
					backgroundColor: "#202020",
					padding: 2, 
					color: "#fff",
					borderRadius: 1,
					border: "1px solid lightgrey"
				}}>
					<Typography sx={{marginBottom: 2, fontSize: 20}}>Вход</Typography>
					<TextField 
						InputProps={{
							style: {color: "#fff"}
						}}
						variant="outlined"
						sx={{marginBottom: 2}}
						placeholder="Почта" 
						value={userLog.email}
						onChange={event => setUserLog({...userLog, email: event.target.value})} 
					/>
					<TextField 
						InputProps={{
							style: {color: "#fff"}
						}}
						variant="outlined"
						sx={{marginBottom: 2}}
						placeholder="Пароль" 
						type="password"
						value={userLog.password}
						onChange={event => setUserLog({...userLog, password: event.target.value})} 
					/>
					<Button sx={{marginTop: 3, color: "#fff"}} variant="primary" onClick={() => dispatch(login(userLog, setMessage))}>Войти</Button>
				</Box>
			</Box>
		</>
	)
}

export default Auth;