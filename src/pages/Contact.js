import React from "react";

export default function Contact() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center" style={{ color: "#0147b3" }}>Contact Us</h2>

      <form className="mt-4 col-md-6 mx-auto p-4 shadow-sm bg-white rounded">
        <input className="form-control mb-3" placeholder="Your Name" />

        <input className="form-control mb-3" placeholder="Email" />

        <textarea className="form-control mb-3" placeholder="Message" rows="4"></textarea>

        <button className="btn btn-primary w-100 rounded-pill">Send</button>
      </form>
    </div>
  );
}