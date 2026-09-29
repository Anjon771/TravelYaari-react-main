import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import Corosal from './Corosal';
import HomeIcon from './HomeIcon';
import Gallery from './GalleryimgHome';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  /* eslint-disable no-unused-vars */
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if (!data) return;
      if (data.error) {
        setError(data.error);
      } else if (Array.isArray(data)) {
        setProductsBySell(data);
      }
    }).catch(() => {});
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (!data) return;
      if (data.error) {
        setError(data.error);
      } else if (Array.isArray(data)) {
        setProductsByArrival(data);
      }
    }).catch(() => {});
  };

  useEffect(() => {
    let isMounted = true;

    getProducts('createdAt').then(data => {
      if (!isMounted || !data) return;
      if (data.error) {
        setError(data.error);
      } else if (Array.isArray(data)) {
        setProductsByArrival(data);
      }
    }).catch(() => {});

    getProducts('sold').then(data => {
      if (!isMounted || !data) return;
      if (data.error) {
        setError(data.error);
      } else if (Array.isArray(data)) {
        setProductsBySell(data);
      }
    }).catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const testimonials = [
    {
      quote: "Our stay at Auli Alpine Haven was transcendent. Waking up to Nanda Devi glowing in golden morning sunlight with hot kahwa prepared by our guide was the trip of a lifetime.",
      author: "Priyanka S. & Vikram Mehta",
      location: "Stayed at Auli Snow Haven",
      date: "February 2026",
      avatar: "PV"
    },
    {
      quote: "The seamless booking and concierge attention at the Taj Heritage Palace exceeded five-star standards. Every detail from the private museum tour to candlelit dining was impeccable.",
      author: "Devendra Rathore",
      location: "Stayed at Taj Heritage Palace",
      date: "January 2026",
      avatar: "DR"
    },
    {
      quote: "Quiet, private, and restorative. The Goa Palm Villa had direct beach access, an exquisite private plunge pool, and truly mindful hospitality. We will be booking with TravelYaari every season.",
      author: "Dr. Ananya Sen",
      location: "Stayed at Goa Palm Sanctuary",
      date: "March 2026",
      avatar: "AS"
    }
  ];

  return (
    <Layout
      title="TravelYaari - Luxury Travel & Resort Bookings"
      description="Curated luxury resorts, boutique villas, and transformative journeys across India."
      className="p-0 m-0"
    >
      {/* 1. Hero Campaign */}
      <Corosal />

      {/* 2. Floating Search Console */}
      <Search />

      {/* 3. The TravelYaari Distinction (Pillars) */}
      <HomeIcon />

      {/* 4. Featured Destinations (Popular Stays) */}
      <section className="py-5" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap">
            <div>
              <span className="text-uppercase" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em', color: '#0F5132' }}>
                Handpicked Collections
              </span>
              <h2
                className="mt-1 mb-0"
                style={{
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#111827'
                }}
              >
                Signature Popular Escapes
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-decoration-none mt-2 mt-sm-0"
              style={{ fontSize: '14px', fontWeight: '600', color: '#0F5132' }}
            >
              View All Destinations <i className="fa fa-arrow-right ml-1"></i>
            </Link>
          </div>

          <div className="row">
            {productsBySell.map((product, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Editorial Quote Banner */}
      <section
        className="py-5 text-white text-center position-relative"
        style={{
          backgroundColor: '#0F5132',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #157347 0%, #0F5132 100%)'
        }}
      >
        <div className="container py-4">
          <i className="fa fa-quote-left mb-3" style={{ fontSize: '28px', opacity: 0.35 }}></i>
          <blockquote
            className="mb-3 mx-auto"
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              fontWeight: '500',
              fontStyle: 'italic',
              maxWidth: '820px',
              lineHeight: '1.4'
            }}
          >
            "Travel is fatal to prejudice, bigotry, and narrow-mindedness, and many of our people need it sorely on these accounts."
          </blockquote>
          <p className="mb-0 text-white-50 font-weight-medium" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
            — Mark Twain · Innocents Abroad
          </p>
        </div>
      </section>

      {/* 6. Seasonal New Arrivals */}
      <section className="py-5" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap">
            <div>
              <span className="text-uppercase" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em', color: '#0F5132' }}>
                Fresh Itineraries
              </span>
              <h2
                className="mt-1 mb-0"
                style={{
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#111827'
                }}
              >
                Seasonal Hideaways & Retreats
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-decoration-none mt-2 mt-sm-0"
              style={{ fontSize: '14px', fontWeight: '600', color: '#0F5132' }}
            >
              Browse Catalog <i className="fa fa-arrow-right ml-1"></i>
            </Link>
          </div>

          <div className="row">
            {productsByArrival.map((product, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Attributable Testimonials (Social Proof) */}
      <section className="py-5" style={{ backgroundColor: '#FAF9F6', borderTop: '1px solid #ECE8E0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-uppercase" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em', color: '#0F5132' }}>
              Guest Stories
            </span>
            <h2
              className="mt-1 mb-2"
              style={{
                fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                fontSize: '32px',
                fontWeight: '700',
                color: '#111827'
              }}
            >
              Memories from the Discerning Traveler
            </h2>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              Over 12,000 travelers have found solace, wonder, and hospitality through TravelYaari.
            </p>
          </div>

          <div className="row">
            {testimonials.map((t, idx) => (
              <div key={idx} className="col-md-4 mb-4">
                <div
                  className="p-4 h-100 bg-white rounded-lg shadow-sm d-flex flex-column justify-content-between"
                  style={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}
                >
                  <div>
                    <div className="d-flex align-items-center mb-3 text-warning">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa fa-star mr-1" style={{ fontSize: '13px', color: '#F59E0B' }}></i>
                      ))}
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#374151', fontStyle: 'italic' }}>
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="pt-3 border-top d-flex align-items-center mt-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mr-3 font-weight-bold"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#E8F5E9',
                        color: '#0F5132',
                        fontSize: '13px'
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <h6 className="mb-0 font-weight-bold" style={{ fontSize: '14px', color: '#111827' }}>{t.author}</h6>
                      <small className="text-muted" style={{ fontSize: '12px' }}>{t.location} · {t.date}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Visual Odyssey (Gallery Preview) */}
      <section className="py-5" style={{ backgroundColor: '#FFFFFF' }} id="homegallery">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap">
            <div>
              <span className="text-uppercase" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em', color: '#0F5132' }}>
                Visual Odyssey
              </span>
              <h2
                className="mt-1 mb-0"
                style={{
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#111827'
                }}
              >
                Snapshots of Serenity
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-decoration-none mt-2 mt-sm-0"
              style={{ fontSize: '14px', fontWeight: '600', color: '#0F5132' }}
            >
              Open Full Gallery <i className="fa fa-arrow-right ml-1"></i>
            </Link>
          </div>

          <Gallery />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
