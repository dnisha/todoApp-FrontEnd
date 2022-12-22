import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Post from './Post'
import CreatePost from './CreatePost'
import React, { useState, useEffect } from 'react';
import { callApi } from "../service/HttpService";

function Card(props) {
    const [post, setPost] = useState([]);
    const addList = async (event) => {
        console.log('base url '+process.env.API_BASE_URL)
        await callApi("Get", "", `${process.env.API_BASE_URL}/v1/todo/allPost`).then(
            (apiResponse) => {
                setPost(apiResponse.response)
                // console.log(apiResponse.response)
            });
    };

    useEffect(() => {
        console.log("card content " + post)
        addList()
    },[]);


    return (
        <>
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Box sx={{ flexGrow: 1 }}>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography textAlign="center" variant="h4">Todo-List</Typography>
                        </Grid>
                        <CreatePost rerender= {addList}></CreatePost>
                        {
                            post.map((p) => {
                                return (

                                    <Post postData={p} key={p.uuid} rerender= {addList}></Post>
                                )
                            })
                        }
                    </Grid>

                </Box>
            </Paper>

        </>
    );
}

export default Card;