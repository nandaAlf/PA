import React from "react";

export default function HeadCard({ titles = [] }) {
  return (
    <div className="container-card header">
      <div className="card-details">
        <span>#</span>
        {titles.map((title,index) => (
          <p key={index}>{title}</p>
        ))}
      </div>
    </div>
  );
}
