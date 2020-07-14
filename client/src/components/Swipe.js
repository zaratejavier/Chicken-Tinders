import React, { useEffect, useState, } from 'react'
import Axios from 'axios'
import up from './img/up.png'
import down from './img/down.png'
import { Redirect } from 'react-router-dom'
import CodeDisplay from './CodeDisplay'
import Menu from './Menu'

export default function Swipe(props) {
    const code = props.location.state.code
    const username = props.location.state.username
    const [groupId, setGroupId] = useState(props.location.state.groupId)
    const [restaurants, setRestaurants] = useState([])
    const [currentRestaurant, setCurrentRestaurant] = useState('')
    const [weMatched, setWeMatched] = useState(false)
    const [count, setCount] = useState(0)
    const [likes, setLikes] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [users, setUsers] = useState([])


    const getUsers = () => {
        Axios.get(`/api/groups/${groupId}/users`)
        .then(res => console.log(res))
        .catch(err=> console.log(err))
    }

    const getRestaurants = () => {
        Axios.get('api/restaurants')
        .then(res => {
            setRestaurants(res.data)
            setCurrentRestaurant(res.data[0])
        })
        .catch(err => console.log(err))
    }

    const getGroupId = () => {
        if (groupId === ""){
            Axios.get(`/api/groups`)
            .then(res => {
                const correctGroup = res.data.filter(group => group.name ===`${code}`)
                setGroupId(correctGroup[0].id)
                console.log(res)
            })
            .catch(err => console.log(err))
        } else {
            console.log(groupId)
        }
    }

    useEffect(()=> {
        getRestaurants()
        getGroupId()
        getLikes()
    },[])

    // search for the one i just liked
    // if it exists update the likedcount to two and set we matched to true
    // if it doesnt exist create a liked restaurant and increment count

    // then get all likes and see if any have been liked by everyone
        //if any have set weMatched to true
        // if not increment count by one

    const checkMatches = () => {
        Axios.get(`/api/groups/${groupId}/liked_restaurants/`)
        .then(res => {
            console.log(res.data)
            if(res.data.length > 0){
                const match = res.data.filter(r => {
                    return r.likedcount > 1
                })
                return match.length > 0 ? setWeMatched(!weMatched) : setCount(count + 1)
            }
        })
    }

    const likeRestaurnt = () => {
        Axios.get(`/api/groups/${groupId}/liked_restaurants/`)
        .then(res => {
        const match = res.data.filter(l => l.restaurant_id == currentRestaurant.id)
        console.log('match filter returned:', match)
            if (match.length > 0){
                updateLike(match[0].id)
            }else{
                createLike()
            }
        })
        checkMatches()
    }

    const getLikes = () => {
        Axios.get(`/api/groups/${groupId}/liked_restaurants`)
        .then(res => {
            setLikes(res.data)
            return res.data
        })
        .catch(err => console.log(err))
    }


    const updateLike = (id) => {
        Axios.put(
            `/api/groups/${groupId}/liked_restaurants/${id}`,
            { likedcount: 2, group_id: groupId, restaurant_id: currentRestaurant.id }
        )
        .then(res2 => {
            console.log('2likes!', res2)
            setWeMatched(!weMatched)
        })
        .catch(err => console.log(err))
    }

    const createLike = () => {
        getLikes()
        Axios.post(
            `/api/groups/${groupId}/liked_restaurants/`,
            { likedcount: 1, group_id: groupId, restaurant_id: currentRestaurant.id }
        )
        .then(res3 => {
            console.log('create new like:', res3)
            setCount(count + 1)
            setCurrentRestaurant(restaurants[count])
        })
        .catch(err => console.log(err))
    }

    const likeButton = () => {
        likeRestaurnt()
        checkMatches()
        getUsers()
    }

    //disliking
    // are there any liked resturants?
    // if not increase the number of the viewed restaurant
    // if there are, do any have a likedcount = # of group member
    // if so return that restaurant
    // if not increase the number of the viewed restaurant

    const dislikeRestaurant = () => {
    Axios.get(`/api/groups/${groupId}/liked_restaurants`)
        .then(res => {
            console.log(res.data)
            //see if there are any liked restaurants with likedcount = # of group members
            if(res.data.length > 0){
            const match = res.data.filter(r => {
                console.log(r.likedcount)
                return r.likedcount > 1
            })
            return (match.length > 0 ? setWeMatched(!weMatched) :  setCount(count + 1), setCurrentRestaurant(restaurants[count]))
            //if so set we matched to true and pass the id of the matched restaurant
            } else {
                setCount(count + 1)
                setCurrentRestaurant(restaurants[count])
            }
        })
        .catch(err => console.log(err))
        getUsers()
    }

    return (
        <div>
            <CodeDisplay code={code}/>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', border:'3px solid black', borderRadius:'30px'}}>
                    <h1 style={{margin:'10px'}}>{currentRestaurant.name}</h1>
                    <img src={currentRestaurant.image} style={{margin:'10px', maxHeight:'300px'}}/>
                    <h3 style={{margin:'20px'}}>Cuisine: {currentRestaurant.cuisine}</h3>
                    <div style={{display:'flex', margin:'20px'}}>
                        <button onClick={() => dislikeRestaurant()}><img src={down}/></button>
                        <div style={{width:'30px'}}/>
                        <button onClick={() => setShowMenu(!showMenu)}>View Menu</button>
                        
                        <div style={{width:'30px'}}/>
                        <button onClick={() => likeButton()}><img src={up}/></button>
                        {weMatched && <Redirect to={{
                    pathname: '/Match',
                    state: { 
                        code: code,
                        username: username,
                        groupId: groupId,
                        restaurant_id: currentRestaurant.id,
                    }}
                    }
                    />}
                    </div>
                </div>
            </div>
            {showMenu && <Menu name={currentRestaurant.name} showMenu={showMenu} setShowMenu={setShowMenu} items={currentRestaurant.menu_items}/>}
        </div>
    )
}
