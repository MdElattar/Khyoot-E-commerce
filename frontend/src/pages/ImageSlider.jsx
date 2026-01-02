import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Collection from './Collection';
import { assets } from '../assets/frontend_assets/assets';

// --- Placeholder Slides Data ---
// REPLACE with your actual slide data (e.g., from an API or local file)
const slides = [
    { url: 'src/assets/frontend_assets/ArabianBurghandy.jpeg', title: 'KHYOOT ARABIAN WEAVE' }, 
    { url: 'src/assets/frontend_assets/Babytee3.jpeg', title: 'KHYOOT BABETEE' },
    { url: 'src/assets/frontend_assets/jackets.jpeg', title: 'KHYOOT BLACLAVA' },
];

const ImageSlider = ({ autoPlay = true, interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    // Auto-Play Logic
    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
    }, [currentIndex, autoPlay, interval]);

    // Style object for the main slide, uses background-image property
    const slideStyles = {
        backgroundImage: `url(${slides[currentIndex].url})`,
    };

    return (
        <div className="professional-slider-container">
            {/* Main Slide Area */}
            <div className="slide-content-area" style={slideStyles}>
                {/* Text Overlay and Button */}
                <div className="slide-overlay-content">
                    <h2 className="overlay-title">{slides[currentIndex].title}</h2>
                    <NavLink to="/Collection" className="shop-now-button">SHOP NOW</NavLink>
                </div>
            </div>
            
            {/* Navigation Arrows (Positioned at the bottom) */}
            <div className="bottom-nav-container">
                <div onClick={goToPrevious} className="bottom-arrow left-arrow">
                    &#8592; {/* Left Arrow */}
                </div>
                
                {/* Dot Navigation */}
                <div className="bottom-dots-container">
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`slider-dot ${slideIndex === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
                
                <div onClick={goToNext} className="bottom-arrow right-arrow">
                    &#8594; {/* Right Arrow */}
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;