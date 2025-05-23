import React from 'react';

function HeaderItem({ name, Icon, className = '' }) {
  return (
    <div className={`flex items-center gap-3 cursor-pointer text-white group hover:text-gray-400 ${className}`}>
      <Icon className="mb-3" />
      {name && (
        <h2 className="relative mt-1 mb-3 whitespace-nowrap">
          {name}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full"></span>
        </h2>
      )}
    </div>
  );
}

export default HeaderItem;

