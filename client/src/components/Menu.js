import React from 'react'
import MenuItem from './MenuItem'
import { FaWindowClose } from 'react-icons/fa';

export default function Menu({items, name, showMenu, setShowMenu}) {

    const formatItems = (items) => {
        items.split(',')
        // .map(i => i.match(/"([^']+)"/g))
    }

    return (
        <div style={styles.menu}>
            <div>
                {console.log(items)}
            <h1 style={{float:'left'}}>{name}</h1>
            <FaWindowClose onClick={() => setShowMenu(!showMenu)}style={{float:'right', fontSize:'30px'}}/>
            </div>
            <div>
                {console.log(formatItems(items))}
                {/* items.map(i => <MenuItem {...i}/>) */}
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