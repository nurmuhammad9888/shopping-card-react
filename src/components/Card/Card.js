import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button,  DialogContent, Stack, TextField, MenuItem, DialogActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React, { useContext } from 'react';
import { Delete } from '@mui/icons-material';
import Edit from '@mui/icons-material/Edit';
import axios from 'axios';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { Modal } from '../Modal/Modal';

export const Cards = ( { obj , setChange} ) => {
    const { product_price, product_name, product_img, product_category, id } = obj;

    function hadlerDelet(id){
        axios.delete(`http://localhost:8080/products/${id}`).then(res => {
            if(res.status === 200){
                setChange(true)
            }
        }).catch(err => console.log(err))
    }

	const [data, setData] = React.useState([]);
	const [editProduct, setEditProduct] = React.useState(0);
    const producNametRef = React.useRef();
    const producPricetRef = React.useRef();
    const producImgRef = React.useRef();
    const producCategpryRef = React.useRef();
    const [productModal, setProductModal] = React.useState(false);
    
    const handlerSubmitProductEdit = (evt) =>{
        console.log(id);
        evt.preventDefault();
        axios.put(" http://localhost:8080/products/" + editProduct,{
            product_name:producNametRef.current.value,
            product_price:producPricetRef.current.value,
            product_img:producImgRef.current.value,
            product_category:producCategpryRef.current.value,
        }).then(res => {
            if(res.status === 200){
                setProductModal(false)
                setChange(true)
                console.log(res);
            }
        }).catch(err => console.log(err))
    }

    React.useEffect(() => {
        axios.get("http://localhost:8080/category").then(res => {setData(res.data)}).catch(err => console.log(err))
    }, [])


	return (
		<>
			<Grid item xs={3}>
                <Card sx={{padding:"10px", height:"400px", boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                    <CardActionArea>
                        <CardMedia component="img" sx={{height:"240px"}} image={product_img} alt={product_name}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h5">
                                {product_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                price : $ {product_price}
                            </Typography>
                        </CardContent>
                        <Button onClick={() => {setProductModal(true); setEditProduct(id)}} sx={{marginLeft:"10px"}} variant='contained' endIcon={<Edit/>}>Edit</Button>
                        <Button onClick={() => { hadlerDelet(id)}} sx={{marginLeft:"40px"}} color="error" variant='contained' endIcon={<Delete />}>Delet</Button>
                    </CardActionArea>
                </Card>
			</Grid>

            <Modal modal={productModal} setModal={setProductModal} title={"Edit Product"}>
                <form onSubmit={handlerSubmitProductEdit}>
                        <DialogContent dividers>
                            <Stack spacing={2}>
                                <TextField sx={{width:"500px"}} defaultValue={product_name} inputRef={producNametRef} id="outlined-basic" label="Product name" variant="outlined"  required/>
                                <TextField sx={{width:"500px"}} defaultValue={product_price} inputRef={producPricetRef} id="outlined-basic" label="Product price" variant="outlined"  required/>
                                <TextField sx={{width:"500px"}} defaultValue={product_img} inputRef={producImgRef} id="outlined-basic" label="Product image url" variant="outlined"  required/>
                                <TextField sx={{width:"500px"}} defaultValue={product_category} inputRef={producCategpryRef} id="outlined-basic" label="Product category" variant="outlined" required select>
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

		</>
	);
};

export const CardsHome = ( {obj} ) => {
    const { addItem } = useCart();
    const { product_price, product_name, product_img } = obj;
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
    const handlerAddItem = () =>{
        if(token){
            addItem({...obj, price:product_price})
        }else{
            navigate("/login")
        }
    }
	return (
		<>
            <Grid item xs={3}>
                <Card sx={{padding:"10px", height:"460px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                    <CardActionArea>
                        <CardMedia component="img" sx={{height:"300px"}} image={product_img} alt={product_name}/>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h5">
                                {product_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                price : ${product_price}
                            </Typography>
                            <Button onClick={() => handlerAddItem()} sx={{marginTop:"20px"}} endIcon={<AddShoppingCartIcon/>} variant='contained'> Add to card </Button>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
		</>
	);
};

