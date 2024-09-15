import React, { useState } from 'react';
import './styles/documentation.css';
import iphone from './assets/iphone-16-ultramarine-custom-close-view.png'
import padlock from './assets/secure-lock-close-up-gradient.png'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Documentation() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 2; // Number of slides

    const cardWidth = 26; // Width of each card in rem

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <>
        <div className="main-container">
            <h1 className="header">Project Overview</h1>
            <h2 className="mtc">Meet the client</h2>
            <p className="main-par">Easy as is an English language learning platform, that pairs students with qualified and verified tutors, at a low cost. The application was designed for immigrants, with low English fluency, but can be used by anyone wanting to learn English.</p>
        </div>
        <div className="doc-carousel">
            <div 
                className="cards" 
                style={{ transform: `translateX(-${currentSlide * cardWidth}rem)`, transition: 'transform 0.5s ease-in-out' }}>
                <div className="doc-card">
                    <div className="text">
                        <h2 className='text-header'>Super Simple.</h2>
                        <p className='text-sub'>Clean UI. Built with you in mind. Quick to learn, fun to use. </p>
                    </div>
                    <div className="iphone">
                        <img src={iphone} alt="slide 1" />
                    </div>
                </div>
                <div className="doc-card card-2">
                <div className="text">
                        <h2 className='text-header'>Super Secure.</h2>
                        <p className='text-sub'>Your data is yours and yours only. Sensitive information is kept away from prying eyes.</p>
                    </div>
                    <div className="lock-wrapper">
                        <img src={padlock} alt="padlock" />
                    </div>
                </div>
                <div className="doc-card card-2">
                    <div className="text">
                        <h2 className='text-header'>Super Elegant.</h2>
                        <p className='text-sub'>Very demure, very mindful.</p>
                    </div>
                </div>
                <div className="doc-card card-3">
                    <div className="text">
                        <h2 className='text-header'>Super Powered.</h2>
                        <p className='text-sub'>Blazing fast, highly optimised. Built for speed, so you never    have to wait to learn.</p>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <div className="doc-button" onClick={handlePrev}>
                    <IoIosArrowBack size={30}/>
                </div>
                <div className="doc-button" onClick={handleNext}>
                    <IoIosArrowForward size={30}/>
                </div>
            </div>
        </div>
        </>
    )
}
