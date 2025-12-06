import { useState } from "react";
import { Link } from "@mui/material";
import { useEffect } from "react";

const Result = ({ isFocused, externalData }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [isFocused]);
  return (
    <div className={`${!isFocused && "hidden"} flex flex-col items-center`}>
      {!externalData || externalData.length === 0 ? (
        <p>COMING...</p>
      ) : (
        externalData.map((item, index) => (
          <Link
            href={`/${item.name.toLowerCase()}/${item.guid}/`}
            key={index}
            underline="none"
            color="white"
            className="w-[90%]"
            onHover={() => setTextColor("orange")}
          >
            <div className="pb-1 flex h-11 items-center bg-[#12151a] border-b border-[grey] p-2 border-1-solid  hover:bg-[#1e2227]">
              <img
                className="h-8 w-8 rounded-lg border-[grey] border"
                src={item.image.icon_url}
              />
              <h1 className={`ml-2 hover:text-[orange]`}>{item.name}</h1> -
              {"  "}
              <p>{item.resource_type}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};
export default Result;
