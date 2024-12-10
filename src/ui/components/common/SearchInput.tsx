// components/common/Search/SearchInput.tsx
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@nextui-org/react';


export default function SearchInput({
  value,
  onChange,
  placeholder = "Search by name...",
  className = "",
}: SearchInputProps)  {
  return (
    <div className="relative">
      {/* <div className="absolute inset-y-0 left-[-10px] pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-[var(--lightsaber-blue)]" />
      </div> */}
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          border-2 
          border-[var(--lightsaber-blue)]
          text-[var(--star-white)]
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-[var(--lightsaber-blue)]
          focus:border-transparent
          placeholder-gray-400
          transition-all
          ${className}
        `}
        startContent={<Search className="h-5 w-5 text-[var(--lightsaber-blue)]" />}
        placeholder={placeholder}
      />
    </div>
  );
};
