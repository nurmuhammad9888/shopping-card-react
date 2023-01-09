import { List, ListItem, Typography, Link, Button } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { NavLink as LinkRouter, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { UserContext } from '../../context/UserContext'

export const Admin = () => {
    const {setToken} = React.useContext(AuthContext);
	const {setUser} = React.useContext(UserContext);
    const navigate = useNavigate()
    return (
        <>
        <Container maxWidth="xl">
            <Box sx={{padding:"20px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Typography sx={{textAlign:"center", color:"black"}} variant='h5' component={"h4"}>Admin page</Typography>
                <Link sx={({isActive}) => isActive ? {textDecoration:"underline", color:"#fff"}: {textDecoration:"none"}} component={LinkRouter} to={"/"}>Home</Link>

					<Button onClick={() => {
						setToken("");
						setUser("")
                        navigate("/")
					}} variant="contained">
                        Login in
                    </Button>
            </Box>
            <Box sx={{display:"flex"}}>
                <Box sx={{ width:"10%", height:"90vh"}}>
                    <List>
                        <ListItem sx={{marginY:"10px"}}>
                            <Link sx={({isActive}) => isActive ? {textDecoration:"underline", color:"#fff"}: {textDecoration:"none", fontSize:"18px"}} component={LinkRouter} to={"category"}>Category</Link>
                        </ListItem>
                        <ListItem sx={{marginY:"10px"}}>
                            <Link sx={({isActive}) => isActive ? {textDecoration:"underline", color:"#fff"}: {textDecoration:"none", fontSize:"18px"}} component={LinkRouter} to={"order"}>Order</Link>
                            </ListItem>
                        <ListItem sx={{marginY:"10px"}}>
                        <Link sx={({isActive}) => isActive ? {textDecoration:"underline", color:"#fff"}: {textDecoration:"none", fontSize:"18px"}} component={LinkRouter} to={"praduct"}>Praduct</Link>
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{width:"100%", backgroundColor:"#e6e0e0"}}>
                    <Outlet/>
                </Box>
            </Box>
        </Container>
        </>
        )
    }
    