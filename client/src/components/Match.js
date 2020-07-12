import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export default function Match(props) {
    const groupId = props.location.state.groupId
    const [match, setMatch] = useState('')

    useEffect(() => {
        Axios.get(`/api/groups/${groupId}/liked_restaurants`)
        .then(res => {
            console.log(res)
            const matchObjArr = res.data.filter(obj => obj.likedcount > 1)
            setMatch(matchObjArr[0])
        })
        .catch(err => console.log(err))
    },[])

    return (
        <div>
            <h1>It's a Match!</h1>
            <h1 style={{margin:'40px'}}>{match.name}</h1>
            <img src={match.image} style={{margin:'40px'}}/>
            <h3 style={{margin:'40px'}}>Cuisine: {match.cuisine}</h3>
            {console.log(props)}
        </div>
    )
}
