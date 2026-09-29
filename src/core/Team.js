import React from 'react';
import Layout from './Layout';
import Sarvesh from './../image/team/img1.jpeg';
import Satyam from './../image/team/img2.jpeg';
import Sachi from './../image/team/img3.jpeg';
import Sarveshbg from './../image/team/img-top1.jpeg';
import Satyambg from './../image/team/img-top2.jpeg';
import Sachibg from './../image/team/img-top3.jpeg';

export default function Team() {
  const teamMembers = [
    {
      name: "Sarvesh Kumar Sharma",
      role: "Co-Founder & Chief Technology Architect",
      bio: "Passionate engineer and data architect dedicated to crafting high-performance, intuitive digital experiences that simplify travel planning.",
      avatar: Sarvesh,
      bg: Sarveshbg,
      github: "https://github.com/shsarv",
      linkedin: "https://www.linkedin.com/in/shsarv/",
      twitter: "https://twitter.com/sarveshroli"
    },
    {
      name: "Sachi Tripathi",
      role: "Co-Founder & Head of Product",
      bio: "Focuses on user-centric interface design, booking workflows, and authentic regional partner integration across Northern and Western India.",
      avatar: Sachi,
      bg: Sachibg,
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    {
      name: "Satyam Kumar Jha",
      role: "Co-Founder & Operations Director",
      bio: "Spearheads ground partner verification, host relations, and our 24/7 concierge desk to ensure unparalleled guest safety and comfort.",
      avatar: Satyam,
      bg: Satyambg,
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  ];

  return (
    <Layout
      title="Our Leadership & Curators - TravelYaari"
      description="Meet the founders and team driving TravelYaari's boutique travel vision."
      className="p-0 m-0"
    >
      {/* Header */}
      <div style={{ backgroundColor: "#FAF9F6", borderBottom: "1px solid #ECE8E0" }} className="py-5">
        <div className="container">
          <span className="text-uppercase" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", color: "#0F5132" }}>
            The Leadership Team
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
            Curators of Extraordinary Journeys
          </h1>
          <p className="text-muted mb-0" style={{ maxWidth: "640px", fontSize: "15px", lineHeight: "1.6" }}>
            Combining cutting-edge software engineering with a reverence for India's timeless landscapes and hospitality traditions.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="col-lg-4 col-md-6 mb-4">
              <div
                className="bg-white rounded overflow-hidden shadow-sm h-100 d-flex flex-column justify-content-between"
                style={{ border: '1px solid #E5E7EB', borderRadius: '16px' }}
              >
                <div>
                  <div style={{ height: '140px', overflow: 'hidden' }}>
                    <img
                      src={member.bg}
                      alt={member.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover', filter: 'brightness(0.9)' }}
                    />
                  </div>

                  <div className="px-4 pb-2 text-center" style={{ marginTop: '-45px' }}>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="rounded-circle shadow-sm"
                      style={{
                        width: '90px',
                        height: '90px',
                        objectFit: 'cover',
                        border: '4px solid #FFFFFF'
                      }}
                    />
                    <h5
                      className="mt-3 mb-1 font-weight-bold"
                      style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontSize: '18px', color: '#111827' }}
                    >
                      {member.name}
                    </h5>
                    <p className="text-success font-weight-medium mb-3" style={{ fontSize: '13px' }}>
                      {member.role}
                    </p>
                    <p className="text-muted" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="p-3 border-top text-center" style={{ backgroundColor: '#FAF9F6' }}>
                  <div className="d-flex justify-content-center" style={{ gap: '18px' }}>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted" title="GitHub">
                      <i className="fa fa-github" style={{ fontSize: '18px' }}></i>
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted" title="LinkedIn">
                      <i className="fa fa-linkedin" style={{ fontSize: '18px' }}></i>
                    </a>
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-muted" title="Twitter">
                      <i className="fa fa-twitter" style={{ fontSize: '18px' }}></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
