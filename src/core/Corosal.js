import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import heroImg from '../assets/images/travel_hero_luxury_resort_1790702626445.jpg';
import rajasthanImg from '../assets/images/rajasthan_heritage_palace_1790702647777.jpg';
import goaImg from '../assets/images/goa_tropical_beach_resort_1790702660352.jpg';
import "../CSS/Corosal.css";

export default function Corosal() {
  return (
    <div className="travelyaari-hero">
      <Carousel interval={5000} pause="hover" fade indicators={true} controls={true}>
        
        {/* Slide 1: Himalayan Sanctuary */}
        <Carousel.Item className="hero-slide-item">
          <img
            className="hero-slide-img"
            src={heroImg}
            alt="Alpine resort in Himalayas"
          />
          <div className="hero-overlay-scrim">
            <div className="hero-content-box">
              <span className="hero-kicker">Curated Stays & Private Retreats</span>
              <h1 className="hero-heading">
                Extraordinary Escapes for Discerning Travelers
              </h1>
              <p className="hero-lead">
                Immerse yourself in handpicked boutique chalets, misty Himalayan valleys, and serene sanctuaries designed for mindful rejuvenation.
              </p>
              <div className="d-flex align-items-center justify-content-center flex-wrap" style={{ gap: '12px' }}>
                <Link to="/shop" className="hero-cta-btn">
                  Explore All Destinations <i className="fa fa-arrow-right ml-2"></i>
                </Link>
                <Link to="/contact" className="hero-secondary-btn">
                  Plan Bespoke Itinerary
                </Link>
              </div>
              <div className="hero-trust-bar">
                <span><i className="fa fa-check-circle text-success mr-1"></i> Verified Luxury Stays</span>
                <span aria-hidden="true">·</span>
                <span><i className="fa fa-star text-warning mr-1"></i> 4.9/5 Guest Satisfaction</span>
                <span aria-hidden="true">·</span>
                <span><i className="fa fa-shield text-info mr-1"></i> Best Rate Guaranteed</span>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 2: Royal Heritage */}
        <Carousel.Item className="hero-slide-item">
          <img
            className="hero-slide-img"
            src={rajasthanImg}
            alt="Royal Heritage Palace in Rajasthan"
          />
          <div className="hero-overlay-scrim">
            <div className="hero-content-box">
              <span className="hero-kicker">Storied Grandeur & Culture</span>
              <h1 className="hero-heading">
                Awaken Within Historic Palaces & Havelis
              </h1>
              <p className="hero-lead">
                Step into centuries of regal heritage with private courtyards, authentic Rajput banquets, and candlelit reflecting pools.
              </p>
              <div className="d-flex align-items-center justify-content-center flex-wrap" style={{ gap: '12px' }}>
                <Link to="/shop" className="hero-cta-btn">
                  Discover Heritage Stays <i className="fa fa-arrow-right ml-2"></i>
                </Link>
                <Link to="/about" className="hero-secondary-btn">
                  The TravelYaari Story
                </Link>
              </div>
              <div className="hero-trust-bar">
                <span><i className="fa fa-check-circle text-success mr-1"></i> Heritage Certified</span>
                <span aria-hidden="true">·</span>
                <span><i className="fa fa-user-circle text-warning mr-1"></i> Private Local Guides</span>
                <span aria-hidden="true">·</span>
                <span><i className="fa fa-calendar-check-o text-info mr-1"></i> Flexible Dates</span>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 3: Coastal Bliss */}
        <Carousel.Item className="hero-slide-item">
          <img
            className="hero-slide-img"
            src={goaImg}
            alt="Tropical Beachfront Villas in Goa"
          />
          <div className="hero-overlay-scrim">
            <div className="hero-content-box">
              <span className="hero-kicker">Coastal Solitude & Ocean Breezes</span>
              <h1 className="hero-heading">
                Pristine Sands & Private Beachfront Villas
              </h1>
              <p className="hero-lead">
                Wake to the gentle rhythm of the Arabian Sea, private sunset infinity pools, and farm-to-table coastal cuisine.
              </p>
              <div className="d-flex align-items-center justify-content-center flex-wrap" style={{ gap: '12px' }}>
                <Link to="/shop" className="hero-cta-btn">
                  Browse Beach Escapes <i className="fa fa-arrow-right ml-2"></i>
                </Link>
                <Link to="/gallery" className="hero-secondary-btn">
                  View Visual Odyssey
                </Link>
              </div>
              <div className="hero-trust-bar">
                <span><i className="fa fa-check-circle text-success mr-1"></i> Direct Shoreline Access</span>
                <span aria-hidden="true">·</span>
                <span><i className="fa fa-coffee text-warning mr-1"></i> Gourmet Breakfast Included</span>
                <span aria-hidden="true">·</span>
                <span><i className="fa fa-heart text-danger mr-1"></i> 100% Mindful Hospitality</span>
              </div>
            </div>
          </div>
        </Carousel.Item>

      </Carousel>
    </div>
  );
}
