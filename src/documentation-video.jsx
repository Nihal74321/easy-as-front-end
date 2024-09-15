import './styles/doc-vid.css'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function DocumentVideo() {
    return (
        <div className='video-wrappper'>
            <div className="video-player-full">
                <div className="header-full">
                    <p className='company-name-full'>Easy As</p>
                    <IoClose className='close-button'/>
                </div>
                <div className="video-container-full">

                </div>
                <div className="controls-full"></div>
            </div>
            <div className="text-intro-container">
                <h1 className="intro-header">Not yet convinced?</h1>
                <h2 className="intro-sub">Take the tour.</h2>
            </div>
            <div className="video-container">
                <div className="container-video">
                    <div className="toggle-video-big">
                        <FaPlay />
                    </div>
                </div>
            </div>
        </div>
    )
}