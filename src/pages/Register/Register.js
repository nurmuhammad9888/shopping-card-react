import { Button, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

export const Register = () => {
    const navigate = useNavigate()
    const [ pasword, setPassword ] = useState(false);
    const { setToken } = useContext(AuthContext)
    const { setUser } = useContext(UserContext)
    const schema = Yup.object({
        frist_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid format").required("Required"),
        password: Yup.string().min(3, "3 ta kamida").max(8, "8 tadan kam bo'lishi kerak").required("Required"),
    })

const { register, watch, formState, handleSubmit, formState:{ errors, isValid }, } = useForm({
    mode:"all",
    defaultValues:{
        frist_name:"",
        last_name:"",
        email:"",
        password:"",
    },
    resolver: yupResolver(schema)
});

const onSubmit = (data) =>{
    axios.post("http://localhost:8080/register", data).then(data => {
        if(data.status === 201){
            setToken(data.data.accessToken)
            setUser(data.data.user)
            navigate("/")
            console.log(data);
        }
    }).catch(error => console.log(error))
}

    return (
        <>
            <Header/>
            <Paper sx={{width:"50%", marginX: "auto", padding:"30px", marginTop:10}} elevation={6}>
                <Typography variant='h4' textAlign="center">Register</Typography>
                <Button variant="outlined" sx={{marginX:"auto", display:"block", marginTop:"20px"}}> <Link style={{color:"#000", fontSize:"12px", textDecoration:"none"}} to={"/login"}>Sizda accont bormi ?</Link> </Button> 
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} marginTop="20px" marginBottom="20px">
                            <TextField id="outlined-basic" label="Frist name" variant="outlined" helperText={errors.frist_name?.message} {...register("frist_name")} />
                            <TextField id="outlined-basic" label="Last name" variant="outlined" helperText={errors.last_name?.message} {...register("last_name")}/>
                            <TextField type="email" id="outlined-basic" label="Email" variant="outlined" helperText={errors.email?.message} {...register("email")}/>
                            <TextField type={pasword ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined" helperText={errors.password?.message} {...register("password")} InputProps={{
                            endAdornment: ( <InputAdornment position="end" onClick={() => setPassword(!pasword)}> <VisibilityIcon sx={{cursor:"pointer"}} /> </InputAdornment> ), }} />
                    </Stack>
                        <Button disabled={!isValid} type="submit" variant="contained" sx={{width:"150px"}}>Send</Button>
                </form>
            </Paper>

        </>
        )
    }
    