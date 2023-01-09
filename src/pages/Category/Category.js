import { Add } from '@mui/icons-material'
import { Box, Button, DialogActions, DialogContent, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Modal } from '../../components/Modal/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Category = () => {
	const [editId, setEditId] = useState(0);
	const [categoryModal, setCategoryModal] = useState(false);
	const [categoryModalEdit, setCategoryModalEdit] = useState(false);
	const [data, setData] = useState([]);
    const categoryRef = useRef();
    const [change, setChange] = React.useState(false);

    const handlerSubmit = (evt) =>{
        evt.preventDefault();
        axios.post(" http://localhost:8080/category",{
            category_name:categoryRef.current.value
        }).then(res => {
            if(res.status === 201){
                setCategoryModal(false)
                setChange(true)
            }
        }).catch(err => console.log(err))
    }
    const handlerSubmitEdit = (evt) =>{
        evt.preventDefault();
        axios.put(`http://localhost:8080/category/${editId}`,{
            category_name:categoryRef.current.value,
        }).then(res => {
            if(res.status === 200){
                setCategoryModalEdit(false)
                setChange(true)
            }
        }).catch(err => console.log(err))
    }
    
    function hadlerDelet(deletId){
        axios.delete(`http://localhost:8080/category/${deletId}`).then(res => {
            if(res.status === 200){
                setChange(true)
            }
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8080/category").then(res => {
            if(res.status === 200){
                setData(res.data)
                setChange(false)
            }    
        }).catch(err => console.log(err))
    }, [change])

    return (
        <Box padding={"32px"}>
            <Button variant='contained' onClick={() => setCategoryModal(true)} endIcon={<Add/>}>Add caregory</Button>
            <TableContainer sx={{marginTop:"30px"}} component={Paper}>
                <Table sx={{ minWidth: 650 , backgroundColor:""}}>
                    <TableHead>
                        <TableRow sx={{backgroundColor:"#1976d2"}}>
                            <TableCell sx={{color:"white"}}>ID</TableCell>
                            <TableCell sx={{color:"white"}} align="center">Category name</TableCell>
                            <TableCell sx={{color:"white"}} align="center">Category actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id} sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" } }>
                            <TableCell >{item.id}</TableCell> 
                            <TableCell align="center">{item.category_name} </TableCell>
                            <Box sx={{display:"flex", justifyContent:"center"}}>
                                <IconButton onClick={() => {setEditId(item.id) ; setCategoryModalEdit(true)}}><EditIcon sx={{color:"#1976d2"}}/></IconButton>
                                <IconButton onClick={() => {hadlerDelet(item.id)}}><DeleteIcon sx={{color:"red"}}/></IconButton>
                            </Box>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal modal={categoryModal} setModal={setCategoryModal} title={"Add category"}>
                <form onSubmit={handlerSubmit}>
                        <DialogContent dividers>
                            <Stack spacing={2}>
                                <TextField sx={{width:"500px"}} inputRef={categoryRef} id="outlined-basic" label="Category name" variant="outlined" required/>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{width:"250px" , justifyContent:"center", marginX:"auto", marginBottom:"20px"}} type='submit' variant='contained'>Add</Button>
                        </DialogActions>
                </form>
            </Modal>
            <Modal modal={categoryModalEdit} setModal={setCategoryModalEdit} title={"Edit category"}>
                <form onSubmit={handlerSubmitEdit}>
                        <DialogContent dividers>
                            <Stack spacing={2}>
                                <TextField sx={{width:"500px"}} inputRef={categoryRef} id="outlined-basic" label="Category name" variant="outlined" required/>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{width:"250px" , justifyContent:"center", marginX:"auto", marginBottom:"20px"}} type='submit' variant='contained'>Edit</Button>
                        </DialogActions>
                </form>
            </Modal>
        </Box>
        )
    }
    