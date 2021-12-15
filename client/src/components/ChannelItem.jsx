import { Box } from '@mui/system'
import React from 'react'
import propTypes from "prop-types";
import { Avatar, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const ChannelItem = ({ info, currentUserId }) => {
    return (
        <Box sx={{marginTop: 2, marginBottom: 2, display: "flex", justifyContent: 'space-between'}}>
            <Box sx={{display: "flex", alignItems: "center", color: "#fff"}}>
                <Avatar alt={info.name} src={info.avatar} sx={{width: 60, height: 60}} />
                <Typography sx={{marginLeft: 2, fontSize: 17}}>
                    <NavLink to={`/users/${info._id}`}>{info.name}</NavLink>
                </Typography>
            </Box>
            {info._id !== currentUserId ? 
                <Button variant="contained" sx={{backgroundColor: "#CC0000"}}>Подписаться</Button>
                : <Button variant="contained">
                    <NavLink to={`/user/${currentUserId}`}>Перейти</NavLink>
                </Button>
            }
            
        </Box>
    )
}

ChannelItem.propTypes = {
    info: propTypes.object.isRequired,
    currentUserId: propTypes.string.isRequired
}

export default ChannelItem
