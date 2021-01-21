import React from "react";
import {Form, Formik} from "formik";
import classes from "../styles/chat.module.css"
import altImage from "../assets/altImage.png"
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import flower from '../assets/flower.png'

const Chat = ({users, newMassage, massages, roomID, socket}) => {


    const scrollToBottom = () => {
        let shoppingListContainer = document.getElementById("containerElement");
        shoppingListContainer.scrollTop = shoppingListContainer.scrollHeight;
    }

    React.useEffect(() => {
        scrollToBottom()
    }, [massages])

    return (
        <>
            <div className={classes.circle1}></div>
            <div className={classes.circle2}></div>
            <Formik initialValues={{massage: ""}}

                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        newMassage(values)
                        setSubmitting(false);
                        resetForm();

                    }}>
                {({values, errors, touched, handleChange, submitForm, handleBlur, isSubmitting, handleSubmit}) => (

                    <div id="style">
                        <Form onSubmit={handleSubmit} onKeyDown={(e) => {
                            const keyCode = e.which || e.keyCode;
                            if (keyCode === 13 && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit()
                            }

                        }}>

                            <div className={classes.container}>

                                <div className={classes.usersArea}>
                                    <section className={classes.room}>
                                        <img src={flower} alt=""/>
                                        <div>{roomID}</div>
                                        <div className={classes.online}>Users online:{users.length}</div>
                                    </section>
                                    <section className={classes.users}>
                                        {users.map((u, i) => (
                                            <div className={classes.user + " " + (socket === u.socket && classes.me)}
                                                 key={i}><img alt={altImage} src={u.imageUrl}/><span>{u.user}</span>
                                            </div>))}
                                    </section>
                                </div>


                                <div id="containerElement" className={classes.chatArea}>
                                    {massages.map((m, i) => (<div key={i}
                                                                  className={socket === m.socket ? classes.myMessage : classes.notMyMessage}>
                                            <section className={socket === m.socket ? classes.massageArea : classes.notMyMassageArea}>
                                                <span className={classes.time}>{m.date}</span>
                                                <div className={classes.mess}>{m.massage}</div>
                                            </section>
                                            <img alt={altImage} src={m.imageUrl} className={classes.img}/>

                                        </div>
                                    ))}
                                </div>

                                <div className={classes.textArea}>
                                    <textarea
                                        className={classes.textarea}
                                        onChange={handleChange}
                                        value={values.massage}
                                        name="massage"
                                        autoFocus={true}
                                        placeholder="Write a massage..."

                                    />

                                    <button
                                        className={classes.button}
                                        type="submit"
                                    >
                                        <SendRoundedIcon/>
                                    </button>

                                </div>


                            </div>

                        </Form>

                    </div>)}
            </Formik>
        </>

    )
}

export default Chat;