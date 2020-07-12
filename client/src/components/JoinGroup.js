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
        setSwipe(!swipe)
    }

    const getGroupId = () => {
        Axios.get(`/api/groups/`)
        .then( (res) => {
            console.log(res)
           const groupObj = res.data.filter(group => 
                group.name === `${groupCode}`
                );
            setGroupId(groupObj[0].id)
            addUser(groupObj[0].id);
        })
        .catch ( (err) => {
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
        
        // setUser([groupObj, ...users]);
    }

    return (
        <div>
            Join Group
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <label>Input your username: </label>
                    <input 
                        value={user} 
                        onChange={(e) => setUser(e.target.value)}>
                    </input>
                <br />
                <br />
                <label>Input your group code: </label>
                <input 
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
