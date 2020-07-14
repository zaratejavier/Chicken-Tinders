import React, { useState, useEffect, } from 'react'
import CodeDisplay from './CodeDisplay'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function CreateUser(props) {
    const code = props.location.state.code
    const [username, setUsername] = useState('')
    const [swipe, setSwipe] = useState(false)
    const [groupId, setGroupId] = useState('')

    async function getGroupId(){
         //get the group id by passing the group code to the backend
         try{
         const res = await Axios.get(`/api/groups`)
             const id = res.data.filter(group => group.name ===`${code}`)
             setGroupId(id[0].id)
             const hardCodedGroupId = id[0].id
            // why cant we use groupId from state in create user here??
         } catch(err){console.log(err)}
    }
    useEffect(() => {
        getGroupId()
    },[])

    const createUser = (group_id) => {
        console.log('create user called')
        Axios.post(`/api/groups/${group_id}/users`, {username: username})
        .then(res => {
            setSwipe(!swipe)
        })
        .catch(err => console.log(err))
    }

    async function handleSubmit(e){
        e.preventDefault()
        createUser(groupId)
    }

    return (
        <div>
            <CodeDisplay code={code}/>
        <div style={styles.layout}>
            <h2 style={{fontSize:'80px', }}>Create a user</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={{padding:'10px'}}> Enter a username</label>
                <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                />
                <button type='submit' style={styles.button}>Start Swiping</button>
            </form>
            {swipe && <Redirect to={{
                pathname: '/Swipe',
                state: { 
                    code: code,
                    username: username,
                    groupId: groupId,
                 }
            }}/>}
        </div>
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
    },
    form: {
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center', 
        padding:'20px', 
        width:'auto',
    },
    layout: {
        height:'80vh', 
        width:'100vw', 
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'space-around', 
        alignItems:'center',
    },
    input: {
        width:'200px', 
        height:'40px', 
        fontSize:'30px', 
        marginBottom:'20px',
    }
}