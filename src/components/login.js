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
        margin: theme.spacing(1, 0, 1),
        backgroundColor:'#73FAA5',
        color:'#000000',
        '&:hover': {
            backgroundColor:'#00FAA5'
        },
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center"
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
        backgroundColor:'#73FAA5',
        color:'#000000',
        '&:hover': {
            backgroundColor:'#00FAA5'
        },
    },
    error: {
        border:'solid 2px rgb(255,0,0,0.4)',
        color:'rgba(34,32,32,0.8)',
        fontWeight:"bold",
        borderRadius:'4px',
        padding:'3px',
        backgroundColor:"rgb(255,183,2,0.3)"
    },

}));

const RoomEnterSchema = Yup.object().shape({
    roomID: Yup.string()
        .required('Room ID is required').max(8, "Maximum 8 symbols"),
    userName: Yup.string()
        .required('User name is required').max(8, "Maximum 8 symbols"),
    file:Yup.mixed().required('An image is required')
});

const Login = ({onLogin}) => {
    const classes = useStyles();


    const hiddenFileInput = React.useRef(null);
    const [fileData, setFileData] = React.useState("")
    const [imageLocation, setImageLocation] = React.useState(false)
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
            <Formik initialValues={{roomID: "", userName: "", file: ""}}
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
                                    onBlur={handleBlur}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    type="text"
                                    label="Room ID"
                                    name="roomID"

                                />
                                {errors.roomID && touched.roomID? (
                                    <div className={classes.error}>{errors.roomID }</div>
                                ) : null}
                                <TextField
                                    value={values.userName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    margin="normal"
                                    fullWidth
                                    name="userName"
                                    label="User Name"
                                    type="text"
                                    autoComplete=""

                                />
                                {errors.userName && touched.userName ? (
                                    <div  className={classes.error}>{errors.userName}</div>
                                ) : null}
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    onBlur={handleBlur}
                                    ref={hiddenFileInput}
                                    onChange={(event) => {
                                        setFileData({
                                            file: URL.createObjectURL(event.target.files[0])
                                        })
                                        setFieldValue('file',event.target.files[0])
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
                                {errors.file && touched.file ? (
                                    <div  className={classes.error}>An image is required</div>
                                ) : null}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={!imageLocation}
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