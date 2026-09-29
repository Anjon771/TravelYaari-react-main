import React from 'react';
import Layout from './Layout';
import { Link } from "react-router-dom";
import heroImg from '../assets/images/travel_hero_luxury_resort_1790702626445.jpg';
import rajasthanImg from '../assets/images/rajasthan_heritage_palace_1790702647777.jpg';

export default function About() {
  return (
    <Layout
      title="About TravelYaari - Our Heritage & Mission"
      description="Learn about the philosophy, vision, and people powering TravelYaari's bespoke luxury retreats."
      className="p-0 m-0"
    >
      {/* Editorial Header */}
      <div style={{ backgroundColor: "#FAF9F6", borderBottom: "1px solid #ECE8E0" }} className="py-5">
        <div className="container">
          <span className="text-uppercase" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", color: "#0F5132" }}>
            Our Heritage & Philosophy
          </span>
          <h1
            className="mt-1 mb-3"
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: "38px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Redefining Travel Across India
          </h1>
          <p className="lead text-muted" style={{ maxWidth: "720px", fontSize: "16px", lineHeight: "1.7" }}>
            Born from a deep love for India's diverse landscapes and centuries of architectural hospitality, TravelYaari curates intimate, restorative sanctuaries for the conscious traveler.
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* Story Section */}
        <div className="row align-items-center mb-5 pb-4">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="overflow-hidden rounded shadow-sm" style={{ aspectRatio: '4/3', borderRadius: '16px' }}>
              <img
                src={heroImg}
                alt="TravelYaari Sanctuary Story"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-lg-6 pl-lg-5">
            <span className="text-uppercase font-weight-bold" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#0F5132' }}>
              The Genesis
            </span>
            <h2
              className="mt-1 mb-3 font-weight-bold"
              style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontSize: '30px', color: '#111827' }}
            >
              Why We Began
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4B5563' }}>
              Conventional booking platforms commoditized travel into cookie-cutter rooms and crowded tourist hubs with hidden surge charges. We envisioned a different way to journey: one where each retreat is deeply rooted in its local culture, mindful of its ecosystem, and hosted with authentic warmth.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4B5563' }}>
              Today, TravelYaari bridges discerning travelers with private Himalayan chalets, restored desert havelis, and tranquil coastal coves with transparent pricing and round-the-clock concierge support.
            </p>
            <div className="pt-2">
              <Link to="/shop" className="btn text-white px-4 py-2 font-weight-bold" style={{ backgroundColor: '#0F5132', borderRadius: '8px' }}>
                Browse Our Stays <i className="fa fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars of Hospitality */}
        <div className="my-5 py-4 border-top border-bottom">
          <div className="text-center mb-5">
            <h3 style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontSize: '28px', color: '#111827' }}>
              The Four Commitments of TravelYaari
            </h3>
          </div>
          <div className="row">
            <div className="col-md-3 mb-4 mb-md-0">
              <h5 className="font-weight-bold" style={{ fontSize: '16px', color: '#0F5132' }}>
                01. Architectural Dignity
              </h5>
              <p className="text-muted" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                We only partner with properties that honor native materials, traditional aesthetics, and low-impact environmental design.
              </p>
            </div>
            <div className="col-md-3 mb-4 mb-md-0">
              <h5 className="font-weight-bold" style={{ fontSize: '0F5132', color: '#0F5132' }}>
                02. Direct Resident Guides
              </h5>
              <p className="text-muted" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                Excursions and cultural tours are led exclusively by native residents who share their living folklore and hidden trails.
              </p>
            </div>
            <div className="col-md-3 mb-4 mb-md-0">
              <h5 className="font-weight-bold" style={{ fontSize: '16px', color: '#0F5132' }}>
                03. Honest Upfront Rates
              </h5>
              <p className="text-muted" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                No surprise foreign transaction surcharges, seasonal resort markups, or hidden checkout extras. What you see is what you pay.
              </p>
            </div>
            <div className="col-md-3">
              <h5 className="font-weight-bold" style={{ fontSize: '16px', color: '#0F5132' }}>
                04. Mindful Stewardship
              </h5>
              <p className="text-muted" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                A share of every reservation directly funds mountain clean-up initiatives and local craftsmanship preservation guilds.
              </p>
            </div>
          </div>
        </div>

        {/* Founders Quote */}
        <div className="row align-items-center my-5">
          <div className="col-lg-6 pr-lg-5 order-2 order-lg-1">
            <span className="text-uppercase font-weight-bold" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#0F5132' }}>
              The Curators
            </span>
            <h2
              className="mt-1 mb-3 font-weight-bold"
              style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontSize: '30px', color: '#111827' }}
            >
              Passionate Tech & Travel Pioneers
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4B5563' }}>
              TravelYaari was founded by Sarvesh Kumar Sharma, Satyam Kumar Jha, and Sachi Tripathi with a commitment to uniting modern full-stack web technology with authentic Indian tourism.
            </p>
            <div className="pt-2">
              <Link to="/team" className="btn btn-outline-secondary px-4 py-2 font-weight-bold" style={{ borderRadius: '8px' }}>
                Meet Our Leadership Team <i className="fa fa-users ml-1"></i>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 mb-4 mb-lg-0 order-1 order-lg-2">
            <div className="overflow-hidden rounded shadow-sm" style={{ aspectRatio: '4/3', borderRadius: '16px' }}>
              <img
                src={rajasthanImg}
                alt="Heritage India"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
