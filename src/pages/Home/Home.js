import {
	Box,
	Container,
	Grid,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { CardsHome } from '../../components/Card/Card';
import { Header } from '../../components/Header/Header';

export const Home = () => {
	const [product, setProduct] = useState([]);
    React.useEffect(() => {
        axios.get(`http://localhost:8080/products`).then(res => setProduct(res.data)).catch(err => console.log(err))
    }, [])
	return (
		<div>
			<Header/>
			<Container maxWidth="xl" sx={{marginBottom:"30px"}}>
				<Box sx={{marginTop:"40px", display:"flex", justifyContent:"space-between", flexWrap:"wrap"}}>
					<Grid container spacing={3}>
						{product.map(obj => (
							<CardsHome key={obj.id} obj={obj}/>
						))}
					</Grid>
				</Box>
			</Container>
		</div>
	);
};
