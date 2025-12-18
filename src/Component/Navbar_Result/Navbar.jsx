import { useState, useEffect } from "react";
import { Link } from "@mui/material";
import { X, ChevronDown } from "lucide-react";

const Navbar = ({ setResult, setFocused }) => {
  const [inputItem, setInputItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [tags, setTags] = useState([]);
  const options = [
    "game",
    "franchise",
    "character",
    "concept",
    "object",
    "location",
    "person",
    "company",
    "video",
  ];

  const addTag = (option) => {
    if (!tags.includes(option)) {
      setTags([...tags, option]);
    }
    setIsOpenOptions(false);
  };
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    if (!inputItem) return;
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [inputItem, tags]);
  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/search?query=${inputItem}&resources=${tags.join(
          ","
        )}`
      );
      const data = await res.json();
      setLoading(false);
      console.log(data.results);
      setResult(data.results);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
    setFocused(isFocused);
  };
  return (
    <div className="flex justify-center">
      <div
        className={`w-330 text-[white] rounded-lg px-2 mt-2 bg-${
          isFocused && "[grey]"
        }`}
      >
        <div className="h-20 flex items-center">
          <Link href="/" className="text-2xl" underline="none" color="white">
            myGs.
          </Link>
          <div className="ml-2">
            <button
              onClick={() => setIsOpenOptions(!isOpenOptions)}
              className="w-32 h-9 flex items-center justify-between border-gray-300 rounded-lg transition-colors bg-white"
            >
              <span className="text-gray-700">Select options</span>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${
                  isOpenOptions ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpenOptions && (
              <div className="absolute w-50 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => addTag(option)}
                    disabled={tags.includes(option)}
                    className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      tags.includes(option)
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "text-gray-700"
                    }`}
                  >
                    {option}
                    {tags.includes(option) && (
                      <span className="ml-2 text-xs text-gray-500">
                        ✓ Selected
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative flex items-center justify-end w-full">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-white px-1 py-1 text-sm border border-[grey] ml-1"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:bg-amber-600 rounded-full transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <svg
              viewBox="0 0 24 24"
              fill="grey"
              className="size-4 left-6 relative"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              value={inputItem || ""}
              onChange={(e) => setInputItem(e.target.value)}
              className={`${
                isFocused ? "w-full" : "w-64"
              } border-gray-300 transition-all duration-300 ease-in-out h-9 bg-[white] text-[black] rounded-lg pl-7 outline-0`}
              placeholder="Search you game"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          <div className="w-50">
            <Link
              href="/log_in"
              className="pl-5"
              underline="none"
              color="white"
            >
              Log in
            </Link>
            <Link
              href="sign_up"
              className="pl-5"
              underline="none"
              color="white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
