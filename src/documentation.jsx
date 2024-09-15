import React, { useState } from 'react';
import './styles/documentation.css';
import iphone from './assets/iphone-16-ultramarine-custom-close-view.png'
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
                        <p className='text-sub'>Clean and to the point</p>
                    </div>
                    <img src={iphone} alt="slide 1" />
                </div>
                <div className="doc-card">
                <div className="text">
                        <h2 className='text-header'>Super Secure.</h2>
                        <p className='text-sub'>Clean and to the point</p>
                    </div>
                    <img src={iphone} alt="slide 2" />
                </div>
                <div className="doc-card">
                <div className="text">
                        <h2 className='text-header'>Super Elegant.</h2>
                        <p className='text-sub'>Clean and to the point</p>
                    </div>
                    <img src={iphone} alt="slide 3" />
                </div>
                <div className="doc-card">
                    <img src={iphone} alt="slide 4" />
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
