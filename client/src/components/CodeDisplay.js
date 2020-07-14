import React from 'react'

export default function CodeDisplay(props) {
    return (
        <div style={styles.banner}>
            <h1>Your Code is: {props.code}</h1>
        </div>
    )
}

const styles = {
    banner: {
        backgroundColor:'#E9692C', 
        textAlign:'center', 
        marginBottom:'40px',
        minHeight:'50px',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
    }
}