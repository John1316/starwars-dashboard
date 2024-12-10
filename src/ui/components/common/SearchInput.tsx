// components/common/Search/SearchInput.tsx
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@nextui-org/react';


export default function SearchInput({
    onChange,
    placeholder = "Search by name...",
    className = "",
}: SearchInputProps) {
    return (
        <div className="relative">
            <Input
                type="text"
                // value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`
                    w-full
                    border-2 
                    border-[var(--lightsaber-blue)]
                    rounded-lg
                    
                    placeholder-gray-400
                    transition-all
                    ${className}
                `}
                startContent={<Search className=" text-[var(--lightsaber-blue)]" />}
                placeholder={placeholder}
            />
        </div>
    );
};
