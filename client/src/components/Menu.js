import React, { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import { FaWindowClose } from 'react-icons/fa';
import Axios from 'axios';

export default function Menu({ restaurant_id, name, showMenu, setShowMenu}) {
    const [items, setItems] = useState([])
    
    useEffect(()=> {
        Axios.get(`/api/restaurants/${restaurant_id}/menu_items`)
        .then(res => setItems(res.data))
        .catch(err => console.log(err))
    },[])

    return (
        <div style={styles.menu}>
            <div>
                {console.log(items)}
            <h1 style={{float:'left'}}>{name}</h1>
            <FaWindowClose onClick={() => setShowMenu(!showMenu)}style={{float:'right', fontSize:'30px'}}/>
            </div>
            <div style={{marginTop:'50px'}}>
                {items.map(i => <MenuItem {...i}/>)}
            </div>
        </div>
    )
}

const styles = {
    menu:{
        height:'50vh', 
        width:'50vw', 
        position:'relative', 
        top:'-500px',
        left:'300px', 
        backgroundColor:'gray',
        borderRadius:'50px',
        border:'3px solid black',
        padding:'20px',
    }
}