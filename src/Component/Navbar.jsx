import temp_logo from "../images/temp_logo.jpg";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
const Navbar = () => {
  const options = ["All", "Games", "Movies", "Tv series"];
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div className="bg-[black] w-300 text-[white] h-20 flex items-center">
      <img className="h-7 w-20 rounded-lg" src={temp_logo} />
      <div className="flex justify-between items-center relative ">
        <div className="rounded-l-lg bg-[white] h-7">
          <Dropdown
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.value)}
            options={options}
            placeholder={options[0]}
            className="w-full"
            pt={{
              root: { className: "h-7" },
              list: { className: "w-50 h-full p-1" },
              input: { className: "p-1 border-none text-[black]" },
            }}
          />
        </div>
        <div>
          <input
            type="text"
            className="w-100 h-7 bg-[white] text-[black] rounded-r-lg p-1"
          />
        </div>
        <div className="absolute right-2">
          <svg
            viewBox="0 0 24 24"
            fill="grey"
            className="size-5 hover:fill-[black] cursor-pointer"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
