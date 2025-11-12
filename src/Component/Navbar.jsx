import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Link } from "@mui/material";

const Navbar = () => {
  const options = ["All", "Games", "Movies", "Tv series"];
  const [dropItem, setDropItem] = useState(null);
  const [inputItem, setInputItem] = useState(null);
  const [externalData, setExternalData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleSearch = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/data?query=${InputText}`
      );
      const data = await res.json();
      setExternalData(data);
    } catch (error) {
      setError(error.massage);
      setLoading(false);
    }
  };
  console.log(externalData.results);
  return (
    <div className=" w-330 text-[white] h-20 flex items-center bg-[grey] rounded-lg px-2">
      <p className="text-2xl">myv.</p>
      <div className="relative flex items-center justify-end w-full">
        <svg viewBox="0 0 24 24" fill="grey" className="size-4 left-6 relative">
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
        <button className="pl-5" onClick={handleSearch}>
          find
        </button>
        <div className="w-50">
          <Link className="pl-5">Log in</Link>
          <Link className="pl-5">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
//478dc71d037549c58732b720314df28d gamebrain api key
//382f90b0 omdb api key
//08eef91c5a865641cc85ae7b771d4002f78ef3cb gaint bomb api key
