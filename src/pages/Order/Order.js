import { Accordion, AccordionDetails, AccordionSummary, Button, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { Delete } from '@mui/icons-material';
export const Order = () => {
	const [data, setData] = useState([]);
    const [change, setChange] = React.useState(false);


	useEffect(() => {
		axios
			.get('http://localhost:8080/orders')
			.then((res) => {
                if(res.status === 200){
                    setData(res.data)
                    setChange(false)
                }
            })
			.catch((err) => console.log(err));
	}, [change]);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    function hadlerDelet(id){
        axios.delete(`http://localhost:8080/orders/${id}`).then(res => {
            if(res.status === 200){
                setExpanded(false)
                setChange(true)
            }
            console.log(res)
        }).catch(err => console.log(err))
    }

	return (
		<>
            <Typography variant='h6' component="h4" sx={{padding:"20px",marginBottom:"20px", backgroundColor:"blue", color:"white"}}>
						ORDER PAGE
				</Typography>
            {data.map(el => (
                <Accordion expanded={expanded === el.id} sx={{}} onChange={handleChange(el.id)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                        <Box sx={{width:"100%", display:"flex",justifyContent:"space-between", alignItems:"center"}}>
                            <Typography sx={{ width: '5%', flexShrink: 0 }}>
                                Id: {el.id}
                            </Typography>
                            <Typography sx={{ width: '20%', flexShrink: 0 }}>
                                {el.user_name}
                            </Typography>
                            <Typography sx={{ width: '33%', color: 'text.secondary' }}>
                                {el.user_email}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Total price : ${el.totalPrice}
                            </Typography>
                        </Box>
                        <Button onClick={() => { hadlerDelet(el.id)}} sx={{marginLeft:"40px"}} color="error" variant='contained' endIcon={<Delete />}>Delet</Button>
                    </AccordionSummary>
                    <AccordionDetails sx={{padding:"20px", paddingTop:"0", color:"#fff"}}>
                        { el.items.map(item =>(
                            <Box sx={{display:"flex",justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", marginY:"10px", padding:"10px", backgroundColor:"#1976d2", borderRadius:"10px"}}>
                                <CardMedia component="img" sx={{height:"80px", width:"80px"}} image={item.product_img} alt={item.product_name}/>
                                <Typography sx={{ width: '25%', fontSize:"18px"}}>
                                    {item.product_name}
                                </Typography>
                                <Typography sx={{ width: '25%', fontSize:"18px" }}>
                                    count : {item.quantity}
                                </Typography>
                                <Typography sx={{ width: '25%', fontSize:"18px" }}>
                                    price : ${item.product_price}
                                </Typography>
                            </Box>
                            ))}
                    </AccordionDetails>
                </Accordion>
            ))}
		</>
	);
};
