import React, { useState } from "react";
import { API } from "../config";
import ModalVideo from 'react-modal-video';
import './../../node_modules/react-modal-video/scss/modal-video.scss';
import resort1 from './../image/resort1.jpg';
import resort2 from './../image/resort2.jpg';
import resort3 from './../image/resort3.jpg';
import resort4 from './../image/resort4.jpg';
import resort5 from './../image/resort5.jpg';
import resort6 from './../image/resort6.jpg';

const fallbackImages = [resort1, resort2, resort3, resort4, resort5, resort6];

const ShowImage = ({ item, url, className = "" }) => { 
    const [isOpen, setOpen] = useState(false);

    const getFallback = () => {
        if (!item) return resort1;
        if (item.image) return item.image;
        const id = item._id || item.name || '';
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = (hash + id.charCodeAt(i)) % fallbackImages.length;
        }
        return fallbackImages[hash];
    };

    const fallbackSrc = getFallback();
    // If backend API is configured and item has an API endpoint photo, use it; otherwise fallback
    const imgSrc = (API && item && item._id && !item.image) ? `${API}/${url}/photo/${item._id}` : fallbackSrc;

    return (
        <div className="position-relative overflow-hidden w-100 h-100" style={{ minHeight: '220px', background: '#F3F4F6' }}>
            {isOpen && item && item.youtubelink && (
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={item.youtubelink} onClose={() => setOpen(false)} />
            )}
            <img
                src={imgSrc}
                alt={item ? item.name : "Destination"}
                className={`w-100 h-100 object-cover ${className}`}
                style={{
                    objectFit: "cover",
                    height: "100%",
                    minHeight: "220px",
                    maxHeight: "320px",
                    transition: "transform 0.4s ease",
                    display: "block"
                }}
                referrerPolicy="no-referrer"
                onError={e => {
                    e.target.onerror = null;
                    e.target.src = fallbackSrc;
                }}
            />
            {item && item.youtubelink && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpen(true);
                    }}
                    className="btn btn-sm btn-light position-absolute shadow-sm"
                    style={{
                        bottom: '12px',
                        right: '12px',
                        borderRadius: '20px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(4px)',
                        border: 'none',
                        color: '#1F2937'
                    }}
                    title="Watch video walkthrough"
                >
                    <i className="fa fa-play text-danger mr-1" style={{ fontSize: '10px' }}></i> Video Tour
                </button>
            )}
        </div>
    );
};

export default ShowImage;
