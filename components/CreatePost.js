import React from 'react';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import { Input } from '@mui/material';
import Button from '@material-ui/core/Button';
import { callApi } from "../service/HttpService";


function CreatePost(props) {
    const [text, setText] = useState("");

    const createList = event => {
        setText(event.target.value);
        // console.log('value is:', event.target.value);
    };

    const addList = async (event) => {
        console.log('value is:', text);
        const body = { content: text }
        await callApi("Post", body, `${process.env.API_BASE_URL}/v1/todo/posts`).then(
            (apiResponse) => {
                setText(apiResponse.response)
                // console.log(apiResponse.response)
                props.rerender()
            });
            setText("")
    };
    return (
        <>
            <Grid item xs={9}>
                <Input
                    id="filled-bare"
                    // variant="outlined"
                    // label={props.post.content}
                    value= {text}
                    variant="outlined"
                    onChange={createList}
                />
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={addList}>
                    ADD
                </Button>
            </Grid>
        </>
    );
}

export default CreatePost;