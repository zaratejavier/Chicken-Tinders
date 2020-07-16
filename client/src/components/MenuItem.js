import React from 'react'

export default function MenuItem(props) {
    return (
        <div style={{display:'flex', justifyContent:'space-around'}}>
            <h2 style={{fontSize:'20px'}}>{props.name}</h2>
            <h2 style={{fontSize:'20px'}}>{props.price}</h2>
            <h3 style={{fontSize:'10px'}}>{props.description}</h3>
        </div>
    )
}
