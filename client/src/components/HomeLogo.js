import React from 'react'
import ChickenTinder from './img/ChickenTinder.png'

export default function HomeLogo() {
    return (
        <div style={{
            display:'flex',
            flexDirection:'column', 
            alignItems:'center', 
            justifyContent:'center', 
            borderRadius:'20px', 
            border:'3px solid black',
            padding:'30px',
            }}>
            <h1>Chicken Tinder</h1>
            <img src={ChickenTinder} style={{maxHeight:'300px'}}></img>
            <p>Don't waste time being hungry! find out what everyone wants to eat NOW!</p>
        </div>
    )
}
