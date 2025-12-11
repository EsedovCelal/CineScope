import { useState } from "react";
import { Link } from "@mui/material";
import { useEffect } from "react";

const Result = ({ isFocused, externalData }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [isFocused]);
  function detectResourceType(data) {
    if (
      data.playtime !== undefined ||
      data.esrb_rating !== undefined ||
      data.screenshots_count !== undefined
    ) {
      return "games";
    }
    if (data.games_count !== undefined && data.games && !data.platform) {
      return "genre";
    }
    if (
      data.platform !== undefined ||
      data.year_start !== undefined ||
      data.year_end !== undefined
    ) {
      return "platform";
    }
    if (data.games_count !== undefined && data.games) {
      return "publisher_or_developer";
    }
    return "unknown";
  }
  return (
    <div className={`${!isFocused && "hidden"} flex flex-col items-center`}>
      {!externalData || externalData.length === 0 ? (
        <p>COMING...</p>
      ) : (
        externalData.map((item, index) => (
          <Link
            href={`${detectResourceType(item)}/${item.slug}/${item.id}`}
            key={index}
            underline="none"
            color="white"
            className="w-[90%]"
            onHover={() => setTextColor("orange")}
          >
            <div className="pb-1 flex h-11 items-center bg-[#12151a] border-b border-[grey] p-2 border-1-solid hover:bg-[#1e2227]">
              <h1 className={`ml-2 hover:text-[orange]`}>{item.name}</h1>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};
export default Result;
