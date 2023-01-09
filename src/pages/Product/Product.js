import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, DialogActions, DialogContent, Grid, MenuItem, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import { Modal } from '../../components/Modal/Modal';
import { Stack } from '@mui/system';
import { Cards } from '../../components/Card/Card';

export const Product = () => {
	const [value, setValue] = React.useState(0);
	const [id, setId] = React.useState(1);
	const [data, setData] = React.useState([]);
	const [product, setProduct] = React.useState([]);
    const [productModal, setProductModal] = React.useState(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
    const [change, setChange] = React.useState(false);

    const producNametRef = React.useRef();
    const producPricetRef = React.useRef();
    const producImgRef = React.useRef();
    const producCategpryRef = React.useRef();

    const handlerSubmit = (evt) =>{
        evt.preventDefault();
        axios.post(" http://localhost:8080/products",{
            product_name:producNametRef.current.value,
            product_price:producPricetRef.current.value,
            product_img:producImgRef.current.value,
            product_category:producCategpryRef.current.value,
        }).then(res => {
            if(res.status === 201){
                setProductModal(false)
                setChange(true)
            }
        }).catch(err => console.log(err))
    }

    React.useEffect(() => {
        axios.get("http://localhost:8080/category").then(res => setData(res.data)).catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        axios.get(`http://localhost:8080/products?product_category=${id}`).then(res => {
            if(res.status === 200){
                setProductModal(false)
                setChange(false)
                setProduct(res.data)
            }
        }).catch(err => console.log(err))
    }, [id, change])
    
	return (
		<div>
            <Box padding={"32px"}>
            <Button variant='contained' onClick={() => setProductModal(true)} endIcon={<Add/>}>Add product</Button>
            </Box>
			<Box sx={{ width: '100%' , padding:"32px"}}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
					{data.map(item => (
                        <Tab key={item.id} label={item.category_name} onClick={() => setId(item.id)} simple-tab={item.id}  />
                    ))}
					</Tabs>
				</Box>
				<Box sx={{marginTop:"40px", display:"flex", flexGrow: 1}} role="tabpanel" hidden={value !== 0} index={0}>
                    <Grid container spacing={2}>
                        {product.map(obj => (
                            <Cards key={obj.id} setChange={setChange} obj={obj}/>
                        ))}
                    </Grid>
				</Box>
			</Box>

            <Modal modal={productModal} setModal={setProductModal} title={"Add Product"}>
                <form onSubmit={handlerSubmit}>
                        <DialogContent dividers>
                            <Stack spacing={2}>
                                <TextField sx={{width:"500px"}} inputRef={producNametRef} id="outlined-basic" label="Product name" variant="outlined"  required/>
                                <TextField sx={{width:"500px"}} inputRef={producPricetRef} id="outlined-basic" label="Product price" variant="outlined"  required/>
                                <TextField sx={{width:"500px"}} inputRef={producImgRef} id="outlined-basic" label="Product image url" variant="outlined"  required/>
                                <TextField sx={{width:"500px"}} inputRef={producCategpryRef} id="outlined-basic" label="Product category" variant="outlined" required select>
                                {data.map(item => (
                                    <MenuItem key={item.id} value={item.id} >{item.category_name}</MenuItem>
                                ))}
                                </TextField>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{width:"250px" , justifyContent:"center", marginX:"auto", marginBottom:"20px"}} type='submit' variant='contained'>Add</Button>
                        </DialogActions>
                </form>
            </Modal>
		</div>
	);
};
