import React from 'react';

const InformationCard= ({title,total,description,value}) => {
  return (
    <div className="bg-white flex items-center justify-between gap-4 rounded-xl border-[1px] border-gray-300 p-4">
      <div className="w-3/4">
        <h2 className="text-sm font-medium">{title}</h2>
        <h2 className="text-xl my-2 font-medium">{total}</h2>
        <p className="text-xs text-gray-500">
          {description} <span className="text-teal-600">{value}</span> 
        </p>
      </div>
      <div className="w-10 h-10 flex items-center justify-center rounded-md text-white text-md bg-teal-600">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
          <path d="M13 7h-2v6h6v-2h-4z"></path>
        </svg>
      </div>
    </div>
  );
};

export default InformationCard;
