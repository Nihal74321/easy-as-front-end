import { useEffect, useState } from 'react';
import './styles/doc-vid.css'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function DocumentVideo() {
    const [handleVideo, setHandleVideo] = useState();

    useEffect(()=> {
        if(handleVideo) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0,0);
        } else if (handleVideo === false){
            const videoElement = document.getElementById('video');
            if (videoElement) {
                videoElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [handleVideo])
    return (
        <>
        <div className='video-wrappper'>
            <div className={`video-player-full ${handleVideo ? "show-video-container" : ""}`}>
                <div className="header-full">
                    <p className='company-name-full'>Easy As</p>
                    <IoClose className='close-button' onClick={() => setHandleVideo(false)}/>
                </div>
                <div className="video-container-full">

                </div>
                <div className="controls-full"></div>
            </div>
            <div className="text-intro-container">
                <h1 className="intro-header">Not yet convinced?</h1>
                <h2 className="intro-sub">Take the tour.</h2>
            </div>
            <div className="" id='video'>
                <div className="container-video">
                    <div className="toggle-video-big">
                        <FaPlay onClick={() => setHandleVideo(true)}/>
                    </div>
                </div>
            </div>
        </div>

        <div className="table-temp">

        </div>
        </>
    )
}