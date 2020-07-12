import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CodeDisplay from './CodeDisplay'

export default function Match(props) {
    const code = props.location.state.code
    const groupId = props.location.state.groupId
    const [match, setMatch] = useState([])

    useEffect(() => {
        Axios.get(`/api/groups/${groupId}/liked_restaurants`)
        .then(res => {
            const matchObjArr = res.data.filter(obj => obj.likedcount > 1)
            Axios.get(`/api/restaurants/${matchObjArr[0].restaurant_id}`)
            .then(res => setMatch(res.data))
            . catch(err => console.log(err))

        })
        .catch(err => console.log(err))
    },[])

    return (
        <div>
            <CodeDisplay code={code}/>
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', borderRadius:'40px', border:'3px solid black', maxWidth:'50vw'}}>
                <h1>It's a Match!</h1>
                <h1 style={{margin:'40px'}}>{match.name}</h1>
                <img src={match.image} style={{margin:'40px', maxHeight:'400px'}}/>
                <h3 style={{margin:'40px'}}>Cuisine: {match.cuisine}</h3>
                </div>
            </div>
        </div>
    )
}
