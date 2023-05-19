import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@mui/icons-material"
import {Link} from "react-router-dom"
import { useContext} from "react"
import {AuthContext} from "../../context/AuthContext"
// import MySearch from "../../pages/mysearch/MySearch";

import {logoutCall} from "../../apiCalls"
// import axios from "axios"

export default function Topbar() {

    const {user, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    const handleClick = () => {
      logoutCall(
        dispatch
      );
    }

    // const [query, setQuery] = useState("");
    // // const [data, setData] = useState([]);
    // // useEffect(() => {
    // //     const fetchData = async () => {
    // //       const res = await axios.get(`/users/mysearch?q=${query}`);
    // //       console.log(res.data);
    // //       setData(res.data);
    // //     };
    // //     //if (query.length === 0 || query.length > 2) 
    // //     fetchData();
    // // }, [query]);
    // const getSearch = (req)=>{
    //     setQuery(req);
    //     console.log(query);
    //     return (
    //             <MySearch query={query}/>
    //     )
    // }


    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">SocialMedia</span>
                </Link>  
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friend, post or video" className="searchInput" 
                       // onChange={(e) => getSearch(e.target.value.toLowerCase())}
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to="/" style={{textDecoration:"none"}}>
                        <span className="topbarLink">Homepage</span>
                    </Link>
                    <Link to="/messenger" style={{textDecoration:"none"}}>
                        <span className="topbarLink">Messenger</span>
                    </Link>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIcon">
                        <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                            <Person className="Icon"/>
                        </Link>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIcon">
                        <Link to="/messenger" style={{textDecoration:"none"}}>
                            <Chat className="Icon"/>
                        </Link>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIcon">
                        <Notifications/>
                        <span className="topbarIconBadge">3</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="topbarImg" />
                </Link>
                     <span className="topbarLink" onClick={handleClick}>LogOut</span>
            </div>
        </div>
    )
}