import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
//import {Posts} from "../../dummyData"

export default function Feed({username}) {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(()=>{
        const fetchPosts = async () => {
            const res =  username ? await axios.get("/posts/profile/"+username) 
                : await axios.get(/*"posts/timeline/63435fa80101f3cf9c42ac93"*/"/posts/timeline/"+user._id);
            setPosts(res.data)
        }
        fetchPosts();
    }, [username, user._id]);
     
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {posts.map(p=>(
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}