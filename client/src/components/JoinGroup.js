import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Axios from "axios"

export default function JoinGroup(props) {
    const code = props.location.state.code
    const [user, setUser] = useState("");
    const [groupCode, setGroupCode] = useState("");
    const [groupId, setGroupId] = useState("")
    const [swipe, setSwipe] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        // Axios.post(`/api/groups`)
        getGroupId();
        if(groupCode.match(/#[0-9][0-9][0-9][0-9][0-9][0-9]/) === null) {
            alert('Code was the wrong format. Please check your code and try again')
            return 
        } 
        if (groupId === '') return 
        setSwipe(!swipe)

    }

    const getGroupId = () => {
        Axios.get(`/api/groups/`)
        .then( (res) => {
           const groupObj = res.data.filter(group => group.name === `${groupCode}`);
           console.log(groupObj)
           if(groupObj.length > 0) {
            setGroupId(groupObj[0].id)
            addUser(groupObj[0].id);
            } else {
                alert('Your code did not match a known group code') 
               return;
            }
        })
        .catch ((err) => {
            console.log(err)
        })
    }

    const addUser = (groupId) => {
        Axios.post(`api/groups/${groupId}/users`, {username: user})
        .then( (res) => {
            console.log(res.data)
         } )
        .catch( (err) => {
            console.log(err)
        })
    }

    return (
        <div>
            Join Group
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <label>Input your username: </label>
                    <input 
                        value={user}
                        required 
                        onChange={(e) => setUser(e.target.value)}>
                    </input>
                <br />
                <br />
                <label>Input your 6 digit group code inlude the hashtag: </label>
                <input 
                    pattern={`#[0-9][0-9][0-9][0-9][0-9][0-9]`}
                    required 
                    value={groupCode} 
                    onChange={(e) => setGroupCode(e.target.value)}>
                </input>
                <br />
                <br />
                <button style={styles.button} type="Submit">Start Swiping!</button>
            </form>
            {swipe && <Redirect to={{
                pathname: '/Swipe',
                state: { 
                    code: groupCode,
                    username: user,
                    groupId: groupId,
                 }
            }}/>}
        </div>
    )
}

const styles = {
    button: {
        padding:'15px',
        fontSize:'25px',
        backgroundColor:'#E9692C',
        borderRadius:'30px',
        border: 'none',
        margin:'30px',
        boxShadow:'2px 2px 2px 2px #e1e1e1'
    }
}
