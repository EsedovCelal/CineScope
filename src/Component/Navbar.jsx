import temp_logo from "../images/temp_logo.jpg";
import Menu from "./Menu";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";

const Navbar = () => {
  const options = ["All", "Games", "Movies", "Tv series"];
  const [dropItem, setDropItem] = useState(null);
  const [inputItem, setInputItem] = useState(null);
  const [externalData, setExternalData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    <div className="bg-[black] w-300 text-[white] h-20 flex items-center">
      <img className="h-7 w-20 rounded-lg" src={temp_logo} />
      <Menu />
      <div className="flex justify-between items-center relative ">
        <div className="absolute rounded-lg bg-[white] h-7">
          <Dropdown
            value={dropItem}
            onChange={(e) => setDropItem(e.value)}
            options={options}
            placeholder={options[0]}
            className="w-full"
            pt={{
              root: { className: "h-7" },
              list: { className: "w-50 h-full p-1" },
              input: { className: "p-1 text-[black] border-0" },
              trigger: { className: "size-3 pt-3.5" },
            }}
          />
        </div>
        <div>
          <InputText
            type="text"
            value={inputItem || ""}
            onChange={(e) => setInputItem(e.target.value)}
            className="w-100 h-7 bg-[white] text-[black] rounded-lg pl-11"
          />
        </div>
        <div className="absolute right-2">
          <svg
            viewBox="0 0 24 24"
            fill="grey"
            className="size-5 hover:fill-[black] cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
          <button onClick={handleSearch}>find</button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
//478dc71d037549c58732b720314df28d gamebrain api key
//382f90b0 omdb api key
//08eef91c5a865641cc85ae7b771d4002f78ef3cb gaint bomb api key
