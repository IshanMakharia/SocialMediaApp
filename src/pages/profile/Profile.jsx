import "./profile.css"
import Leftbar from "../../components/leftbar/Leftbar"
import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"

export default function Profile() {
    return (
        <>
            <Topbar/>
            <div className="profile">
                <Leftbar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src="assets/post/3.jpeg" alt=""/>
                            <img className="profileUserImg" src="assets/person/7.jpeg" alt=""/>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Ishan Makharia</h4>
                            <span className="profileInfoDesc">Like to travel</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed/>
                        <Rightbar profile/>
                    </div>
                </div>
            </div>
        </>
    )
}