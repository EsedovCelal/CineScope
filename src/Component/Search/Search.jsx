import { useState } from "react";
import { useEffect } from "react";
import { Link } from "@mui/material";

const Search = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [inputItem, setInputItem] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const items = [
    {
      id: 1,
      title: "movie",
    },
    {
      id: 2,
      title: "tv",
    },
    {
      id: 3,
      title: "people",
    },
    {
      id: 4,
      title: "Collection",
    },
    {
      id: 5,
      title: "Keywords",
    },
    {
      id: 6,
      title: "Companies",
    },
    { id: 7, title: "Networks" },
    { id: 8, title: "Awards" },
  ];

  const handleSelect = (title) => {
    setSelectedItem(title);
  };
  useEffect(() => {
    if (!inputItem) return;
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [inputItem, selectedItem]);
  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/search?query=${inputItem}&type=${selectedItem}`
      );
      const data = await res.json();
      setLoading(false);
      console.log(data.results);
      setResult(data.results);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputItem(newValue);
    localStorage.setItem("searchInput", newValue);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem("searchInput");
    if (savedValue !== null) {
      setInputItem(savedValue);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[70%] ">
        <div>
          <input
            value={inputItem}
            className="w-full border-[#01B4E4] border-2 rounded-lg p-3 mb-5 mt-5"
            type="text"
            onChange={handleChange}
            placeholder="Search some"
          />
        </div>
        <div className=" gap-10 flex justify-between">
          <div className="w-80 rounded-lg">
            <div className="flex justify-center items-center bg-[#01B4E4] h-20 font-bold ">
              <p>Search results</p>
            </div>
            {items.map((item) => {
              const isSelected = selectedItem === item.title;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.title)}
                  className={`pl-5
                  bg-white shadow-md cursor-pointer
                  transition-all duration-200 border-2
                  ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 shadow-lg scale-105"
                      : "border-transparent hover:border-indigo-200 hover:shadow-lg"
                  }
                `}
                >
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isSelected ? "text-indigo-700" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="w-full">
            {result &&
              result.map((item, index) => (
                <div
                  className="border flex mb-5 key={index} rounded-lg shadow-md gap-5"
                  key={index}
                >
                  <img
                    className="rounded-lg shadow-lg"
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                  <p>{item.title || item.name}</p>
                  <p className="line-clamp-2">{item.overview}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
