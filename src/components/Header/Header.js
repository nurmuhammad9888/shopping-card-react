import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import { Badge } from '@mui/material';
import { useCart } from 'react-use-cart';
import { CardCard } from '../CardCard/CardCard';
import { Modal } from '../Modal/Modal';
import axios from 'axios';

export const Header = () => {
	const { user, setUser } = React.useContext(UserContext);
	const { token, setToken } = React.useContext(AuthContext);

	const { totalItems, isEmpty, emptyCart, items, cartTotal, id } = useCart()

	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const [state, setState] = React.useState(false);
	const [productSend, setproductSend] = React.useState(false);

	const toggleDrawer = (anchor, open) => (event) => {
		setState({ ...state, [anchor]: open });
	};
	const handlerSend = () =>{
		axios.post(" http://localhost:8080/orders",{
            user_name: user.frist_name,
            user_id: user.id,
            user_email: user.email,
			items: items,
			totalPrice: cartTotal,
        }).then(res => {
            if(res.status === 201){
                setproductSend(false)
				setState(false)
				emptyCart(id)
            }
        }).catch(err => console.log(err))
	}
	const list = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' ? 'auto' : 380, height:"99%"}}
			role="presentation">
			<List sx={{ height:"100%"}}>
				<ListItem sx={{flexGrow:"1"}} disablePadding>
					{isEmpty ? <Typography sx={{padding:"10px"}}>Cart is empty</Typography> : ""}
				</ListItem>
				<ListItem sx={{flexDirection:"column", paddingBottom:"120px"}}>
					{
						items.map(item => <CardCard key={item.id} item={item}/>)
					}
				</ListItem>
				<ListItem sx={{position:"fixed", bottom:"0", backgroundColor:"#1976d2", paddingY:"20px", flexWrap:"wrap", width:"380px"}}>
					<Typography sx={{marginBottom:"15px", fontSize:"18px"}} color="white" ml={2} variant='body1'> Total price: ${cartTotal}</Typography>
					<Box>
						<Button onClick={() => emptyCart()} color='error' variant='contained'>Clear card</Button>
						{items.length ? <Button onClick={() => setproductSend(true)} color='success' variant='contained' sx={{marginLeft:"20px"}}>Order</Button> : <Button disabled onClick={() => setproductSend(true)} color='success' variant='contained' sx={{marginLeft:"20px"}}>Order</Button>}
						
					</Box>
				</ListItem>
			</List>
		</Box>
	);
	return (
		<AppBar position="static" sx={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box>
						<Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, color: 'inherit', textDecoration: 'none'}}>
							LOGO
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							<NavLink
								to={'/'}
								style={{ color: '#fff', textDecoration: 'none', marginRight: '20px'}}>
								Home
							</NavLink>
						</Box>
						<Box sx={{ color: '#fff' }}>
							<NavLink
								to={'/login'}
								style={{ color: '#fff', textDecoration: 'none', marginRight: '20px'}}>
								Login
							</NavLink>
						</Box>
						<Box>
							{['right'].map((anchor) => (
								<React.Fragment key={anchor}>
									<Badge badgeContent={totalItems} sx={{top:"10px"}} color="error">
										<Button
											sx={{ color: 'white', backgroundColor:"blue", top:"-10px", borderRadius:"50%", minWidth:"50px", height:"50px", padding:"0" }}
											onClick={toggleDrawer(anchor, true)}							>
											<ShoppingCartIcon />
										</Button>
									</Badge>
									<Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
										{list(anchor)}
									</Drawer>
								</React.Fragment>
							))}
						</Box>
						{token ? (
							<Box sx={{ flexGrow: 0 , marginLeft:"30px"}}>
								<Tooltip title="Open settings">
									<IconButton
										onClick={handleOpenUserMenu}
										sx={{ p: 0, fontSize: '15px', backgroundColor: '#fcfcfc', width: '45px', height: '45px'}}>
										{user.id ? (
											user.last_name.charAt(0) + ' ' + user.frist_name.charAt(0)
										) : (
											<AccountCircleIcon />
										)}
									</IconButton>
								</Tooltip>
								<Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ 	vertical: 'top',horizontal: 'right'}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}>
									<MenuItem onClick={handleCloseUserMenu}>
										<Button
											onClick={() => {
												setToken('');
												setUser('');
											}}
											variant="contained"
										>
											Login in
										</Button>
									</MenuItem>
								</Menu>
							</Box>
						) : (
							''
						)}
					</Box>
				</Toolbar>
				<Modal title="Are you sure ?" modal={productSend} setModal={setproductSend}>
					<Box sx={{width:"300px", height:"200px", display:"flex", justifyContent:"center", alignItems:"center"}}>
						<Button onClick={() => setproductSend(false)} variant='outlined' endIcon={<CloseIcon/>} color='error'>NO</Button>
						<Button onClick={handlerSend} sx={{marginLeft:"40px"}} variant='outlined' endIcon={<DoneIcon/>} color='success'>YES</Button>
					</Box>
				</Modal>
			</Container>
		</AppBar>
	);
};
