import React from "react";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import {Form, Formik} from "formik";
import classes from "../styles/chat.module.css"
import altImage from "../assets/altImage.png"

const Chat = ({users,newMassage,massages,roomID,socket}) => {


    const scrollToBottom=()=>{
             let shoppingListContainer = document.getElementById("containerElement");
             shoppingListContainer.scrollTop = shoppingListContainer.scrollHeight;
     }

    React.useEffect(()=>{
        scrollToBottom()
    },[massages])

    return (

        <Formik initialValues={{massage: ""}}

                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    newMassage(values)
                    setSubmitting(false);
                    resetForm();

                }}>
            {({values, errors, touched, handleChange, submitForm, handleBlur, isSubmitting, handleSubmit}) => (

                <div id="style" className={classes.wrapper}>
                    <Form onSubmit={handleSubmit} onKeyDown={(e)=>{
                        const keyCode = e.which || e.keyCode;
                        if(keyCode===13 && !e.shiftKey){
                            e.preventDefault();
                            handleSubmit()
                        }

                    }} >

                        <Grid  className={classes.container}>

                        <div className={classes.usersArea}>
                            <h1>Room: <div>{roomID}</div></h1>
                            <ul>
                            {users.map((u,i) => (<li className={classes.user + " " + (socket===u.socket && classes.me)} key={i}><img alt={altImage} src={u.imageUrl}/><span>{u.user}</span></li>))}
                            </ul>
                        </div>


                        <div id="containerElement" className={classes.chatArea} >
                            {massages.map((m,i) => (<div key={i} className={socket===m.socket ? classes.myMessage : classes.notMyMessage}>

                                <div className={classes.mess}>{m.massage}</div>
                                    <div className={classes.imgContainer}>
                                        <img alt={altImage} src={m.imageUrl} className={classes.img} />
                                        <span className={classes.name}>{m.user}</span>
                                    </div>

                                    <div className={classes.time}>{m.date}</div>
                            </div>
                            ))}
                        </div>

                        <div className={classes.textArea}>
                                <TextareaAutosize
                                    className={classes.textarea}
                                    onChange={handleChange}
                                    value = {values.massage}
                                    type="text"
                                    name="massage"
                                    rows={4}
                                    autoFocus={true}
                                    placeholder="Write a massage..."
                                    aria-label="maximum width"
                                />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                SEND
                            </Button>

                        </div>



                    </Grid>

                    </Form>

                </div>)}
        </Formik>

    )
}

export default Chat;