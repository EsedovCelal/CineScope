import { useState } from "react";
import { useEffect } from "react";
import { Link } from "@mui/material";

const Search = () => {
  const [selectedItem, setSelectedItem] = useState("movie");
  const [inputItem, setInputItem] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const items = [
    {
      id: 1,
      title: "Movie",
    },
    {
      id: 2,
      title: "Tv Shows",
    },
    {
      id: 3,
      title: "People",
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

  const handleSelect = (id) => {
    setSelectedItem(id);
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
  return (
    <div className="">
      <div>
        <input
          className="w-full"
          type="text"
          onChange={(e) => setInputItem(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <div className="w-[70%] gap-10 flex justify-between">
          <div className="w-50 ">
            <div className="">
              {items.map((item) => {
                const isSelected = selectedItem === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`pl-5
                  bg-white rounded-lg shadow-md cursor-pointer
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
          </div>
          <div className="w-full">
            {result &&
              result.map((item, index) => (
                <div className="border flex mb-5">
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
