import { Button, CardMedia, Divider, List, ListItem, ListItemAvatar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import { useCart } from 'react-use-cart';

export const CardCard = ({ item }) => {
    const { product_name, product_price, product_img, id, quantity} = item;
    const { updateItemQuantity, removeItem } = useCart();
    
    return (
        <List sx={{width:"100%"}}>
            <ListItem sx={{padding:"0"}} alignItems="flex-start">
                <ListItemAvatar>
                <CardMedia component="img" sx={{height:"100px"}} image={product_img} alt={product_name}/>
                </ListItemAvatar>
                <Box>
                <Typography sx={{fontSize:"22px", display:"block"}}>{product_name}</Typography>
                <Typography sx={{ fontSize:"18px" }} component="span" variant="body2" color="text.primary">price: ${product_price}</Typography>
                </Box>
            </ListItem>
            <ListItem>
                <Button onClick={() => updateItemQuantity(id, quantity + 1)} sx={{fontSize:"14px",minWidth:"45px", padding:"5px"}} variant='contained'>+</Button>
                <Typography  mx={2}>{quantity}</Typography>
                <Button onClick={() => updateItemQuantity(id, quantity - 1)} sx={{fontSize:"14px",minWidth:"45px", padding:"5px"}} variant='contained'>-</Button>
                <Button onClick={() => removeItem(id)} sx={{fontSize:"12px",minWidth:"45px", padding:"6px", marginLeft:"30px"}} color="error" variant='outlined'>Clear all</Button>
            </ListItem>
            <Divider/>
        </List>
        )
    }
    