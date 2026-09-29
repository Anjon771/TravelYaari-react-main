import React from 'react';
import "../CSS/HomeIcon.css";

export default function HomeIcon() {
  const pillars = [
    {
      icon: "fas fa-compass",
      title: "Handpicked Sanctuaries",
      description: "Each chalet, heritage palace, and seaside villa is strictly evaluated for architectural integrity and natural serenity."
    },
    {
      icon: "fas fa-map-marked-alt",
      title: "Authentic Local Guides",
      description: "Explore secret Himalayan trails, private Shikara waterways, and artisan workshops alongside resident storytellers."
    },
    {
      icon: "fas fa-shield-alt",
      title: "Transparent Pricing",
      description: "Direct resort partner rates with daily gourmet breakfasts and inclusions itemized upfront. No hidden surcharges."
    },
    {
      icon: "fas fa-concierge-bell",
      title: "Dedicated Concierge",
      description: "From private airstrip transfers to fireside dining arrangements, our hospitality team supports your trip 24/7."
    }
  ];

  return (
    <section className="travelyaari-pillars">
      <div className="container">
        
        <div className="text-center mb-5">
          <span className="text-uppercase" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em', color: '#0F5132' }}>
            The TravelYaari Distinction
          </span>
          <h2
            className="mt-2 mb-3"
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: '32px',
              fontWeight: '700',
              color: '#111827'
            }}
          >
            Thoughtfully Crafted Journeys
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '640px', fontSize: '15px', lineHeight: '1.6' }}>
            We blend boutique hospitality with immersive local knowledge to turn vacations into transformative travel stories.
          </p>
        </div>

        <div className="row">
          {pillars.map((item, idx) => (
            <div key={idx} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <div className="pillar-card">
                <div className="pillar-icon-box">
                  <i className={item.icon}></i>
                </div>
                <h4 className="pillar-title">{item.title}</h4>
                <p className="pillar-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
