import React from "react";
import Layout from './Layout';
import Gallery from "react-photo-gallery";
import { photos } from "./Photos";

export default function Galleryimg() {
  return (
    <Layout
      title="Visual Odyssey & Gallery - TravelYaari"
      description="Immerse in breathtaking photography from our boutique sanctuaries and retreats across India."
      className="p-0 m-0"
    >
      <div style={{ backgroundColor: "#FAF9F6", borderBottom: "1px solid #ECE8E0" }} className="py-5">
        <div className="container">
          <span className="text-uppercase" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", color: "#0F5132" }}>
            Visual Odyssey
          </span>
          <h1
            className="mt-1 mb-2"
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: "36px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Snapshots of Wonder & Serenity
          </h1>
          <p className="text-muted mb-0" style={{ maxWidth: "640px", fontSize: "15px", lineHeight: "1.6" }}>
            Glimpses into morning mist on Dal Lake, golden sandstone courtyards in Rajasthan, and secluded sunset pools in Goa.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="bg-white p-3 p-md-4 rounded shadow-sm border" style={{ borderRadius: '16px' }}>
          <Gallery photos={photos} margin={8} />
        </div>
      </div>
    </Layout>
  );
}
