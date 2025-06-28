import type { ChangeEvent } from 'react';
import { CiSearch } from "react-icons/ci";

interface SearchBoxProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox = ({
  value,
  onChange,
  placeholder = "Search ...",
  className = ""
}: SearchBoxProps) => {
  return (
    <div className={`w-full max-w-md relative ${className}`}>
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <CiSearch size={20} />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-[50px] pl-10 pr-4 py-2 bg-white border border-gray-300 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
      />
    </div>
  );
};

export default SearchBox;
