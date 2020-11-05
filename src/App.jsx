import React, {useEffect} from "react";
import Login from "./components/login";
import reducer from "./reducer";
import {socket} from "./socket";
import Chat from "./components/chat";
import axios from "axios"


const App = () => {
    const [state, dispatch] = React.useReducer(reducer, {
        joined: false,
        socket: null,
        userName: null,
        roomID: null,
        imageUrl: null,
        users: [],
        massages: [],
        imageData: null
    })


    const onLogin = (obj) => {

        dispatch({
            type: 'ADD_IMAGE_DATA', payload: obj.file
        })

        socket.emit('ROOM:JOIN', {
            roomID: obj.roomID,
            user: obj.userName,
            imageUrl: obj.imageLocation
        })
        dispatch({
            type: 'ADD_IMAGE_URL', payload: obj.imageLocation
        })
        dispatch({
            type: 'JOINED', joined: true, payload: obj
        })

        axios.get(`https://hidden-peak-11463.herokuapp.com//rooms/${obj.roomID}`).then((res) => {
            dispatch({
                type: 'JOINED', joined: true, payload: obj
            })
            dispatch({
                type: 'ADD_USERS', payload: res.data.users
            })
            dispatch({
                type: 'ADD_MASSAGE', payload: res.data.massages
            })
        })


    }

    const newMassage = ({massage}) => {

        socket.emit('ROOM:NEW_MASSAGE', {
            roomID: state.roomID,
            user: state.userName,
            massage: massage,
            imageUrl: state.imageUrl,
            date: new Date().toLocaleString("en-US",{
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            })

        })
    }
    useEffect(() => {
        socket.on('ROOM:JOINED', (users) => {
            dispatch({
                type: 'ADD_USERS', payload: users
            })


        })
        socket.on('ROOM:LEFT', (users) => {
            dispatch({type: 'ADD_USERS', payload: users})
        })

        socket.on('connect', () => {
            const id = socket.id;
            dispatch({type: 'ADD_SOCKET', payload: id})
        })

        socket.on('ROOM:MASSAGE', (massages) => {
            dispatch({type: 'ADD_MASSAGE', payload: massages})
        })

    }, [])


    window.state = state;
    return (
        <div>
            {!state.joined ? <Login onLogin={onLogin}/> : <Chat {...state} newMassage={newMassage}/>}
        </div>
    )
}

export default App;