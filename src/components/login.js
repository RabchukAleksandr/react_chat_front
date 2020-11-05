import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Form, Formik} from "formik";
import Fab from '@material-ui/core/Fab';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import * as Yup from 'yup';
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ImageCropper from "./imagecropper";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: "50%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    addImg: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginLeft: "43%"
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
}));

const RoomEnterSchema = Yup.object().shape({
    roomID: Yup.string()
        .required('Required').max(10, "Maximum 10 symbols"),
    userName: Yup.string()
        .required('Required').max(10, "Maximum 10 symbols"),

});

const Login = ({onLogin}) => {
    const classes = useStyles();

    const hiddenFileInput = React.useRef(null);
    const [fileData, setFileData] = React.useState(null)
    const [imageLocation, setImageLocation] = React.useState("")
    const [showModal, setShowModal] = React.useState(false)
    const handleClick = event => {
        hiddenFileInput.current.click();

    };

    const clearFileData =()=>{
        setFileData(null)
    }
    const passCroppedImage = async (croppedImage) => {

        const formData = new FormData();
        formData.append("image", croppedImage, "image.png")
        const res = await axios.post("https://hidden-peak-11463.herokuapp.com/upload", formData, {
            headers: {
                'Content-Type': 'form-data',
            }
        })
        setImageLocation(res.data.Location)
    }

    return (
        <>
            {fileData && <ImageCropper passCroppedImage={passCroppedImage} imageData={fileData} show={showModal}
                                       onHide={() => setShowModal(false)} clearFileData={clearFileData}/>}
            <Formik initialValues={{roomID: "", userName: "", file: null}}
                    validationSchema={RoomEnterSchema}
                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        setSubmitting(false);
                        resetForm();
                        const obj = {
                            roomID: values.roomID,
                            userName: values.userName,
                            imageLocation
                        }
                        onLogin(obj);
                    }}>
                {({values, errors, touched, setFieldValue, handleChange, submitForm, handleBlur, isSubmitting, handleSubmit}) => (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className={classes.paper}>

                            <Typography component="h1" variant="h5">
                                Enter Chat
                            </Typography>
                            <Form className={classes.form} onSubmit={handleSubmit}>
                                <TextField
                                    value={values.roomID}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    maxLength={10}
                                    type="text"
                                    label="Room ID"
                                    name="roomID"
                                    autoComplete=""
                                    autoFocus
                                />

                                <TextField
                                    value={values.userName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required

                                    fullWidth
                                    name="userName"
                                    label="User Name"
                                    type="text"
                                    autoComplete=""
                                />

                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    ref={hiddenFileInput}
                                    onChange={(event) => {
                                        setFileData({
                                            file: URL.createObjectURL(event.target.files[0])
                                        })
                                        setShowModal(true)
                                    }}
                                    hidden
                                />
                                {!imageLocation ?
                                    <Tooltip title="Add profile photo" arrow placement="right">
                                        <Fab className={classes.addImg} color="primary" aria-label="add"
                                             onClick={handleClick}>
                                            <InsertPhotoIcon/>
                                        </Fab>
                                    </Tooltip> :
                                    <Tooltip title="Image uploaded" arrow placement="right">
                                        <Fab className={classes.addImg} color="primary" aria-label="add"
                                             onClick={handleClick}>
                                            <CheckCircleIcon/>
                                        </Fab>
                                    </Tooltip>

                                }
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    GO
                                </Button>

                            </Form>

                        </div>
                    </Container>)}
            </Formik>
        </>)
}
export default Login;