import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from "@material-ui/core/IconButton";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { callApi } from "../service/HttpService";

function post(props) {
    const [text, setText] = useState(props.post.content);
    const [color, setColor] = useState("secondary");
    const [bool, setBool] = useState(false);

    const deleteList = uuid => {
        console.log('value is:', uuid);
        deletePost(uuid)
        // apiHandle("create", 123)
    };

    const deletePost = async (id) => {
        console.log('delete post of id: ', id);
        await callApi("Get", "", `http://localhost:8080/v1/todo/post/${id}`).then(
            (apiResponse) => {
                // console.log(apiResponse)
                props.rerender()
            });
    };

    const editPostRequest = async (id) => {
        console.log('edit post of id: ', id);
        const body = { content: text }
        await callApi("Put", body, `http://localhost:8080/v1/todo/post/${id}`).then(
            (apiResponse) => {
                console.log(apiResponse)
                // props.rerender()
            });
    };
    const enbleEdit = () => {
        if (bool == false) {
            setBool(true)
            setColor("primary")
            console.log(" enabled..")
        }
        else {
            setBool(false)
            setColor("secondary")
            console.log(" disabled..")
        }

    }
    const editPost = event => {
        if (bool === true)
            setText(event.target.value);
    };


    return (
        <>
            <Grid item xs={8}>
                <TextField
                    value={text}
                    variant="outlined"
                    onChange={editPost}
                    color={color}
                />
            </Grid>
            <Grid item xs={4}>
                <IconButton>
                    <CheckIcon fontSize="medium" color='success' id={props.post.uuid} onClick={() => editPostRequest(props.post.uuid)}></CheckIcon>
                </IconButton>
                <IconButton>
                    <BorderColorOutlinedIcon fontSize="medium" color='primary' id={props.post.uuid} onClick={enbleEdit}></BorderColorOutlinedIcon>
                </IconButton>
                <IconButton>
                    <DeleteOutlineOutlinedIcon fontSize="medium" style={{ color: "red" }} id={props.post.uuid} onClick={() => deleteList(props.post.uuid)}></DeleteOutlineOutlinedIcon>
                </IconButton>
            </Grid>
        </>
    );
}

export default post;