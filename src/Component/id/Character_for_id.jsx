import TabbedInterface from "./TabbedInterface";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronsRight } from "lucide-react";
import { Link } from "@mui/material";
const Character_for_id = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [id_data, setId_data] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch_for_id = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/character/${id}`);
        const data = await res.json();
        setId_data(data.results);
        console.log(data.results);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch_for_id();
  }, [id]);
  console.log(id_data);
  return (
    <div>
      <div className="flex justify-center items-center h-80 bg-[#12151a]">
        {!id_data || id_data.length === 0 ? (
          <p> COMING...</p>
        ) : (
          <div className="flex max-w-6xl">
            <div>
              <img
                className="max-w-76 max-h-60 w-auto h-auto border border-[grey]"
                src={id_data.image.small_url}
                alt={id_data.name}
              />
            </div>
            <div>
              <div className="flex justify-between ">
                <p className="text-5xl mb-5 ml-10 hover:text-[orange]">
                  {id_data.name}
                </p>
                <button className="border border-[grey] h-full cursor-pointer w-30">
                  follow
                </button>
              </div>
              <div className="flex items-center mb-5">
                <p className="ml-10">CHARACTER</p>
                <ChevronsRight size={18} />
                <p>
                  appears in{" "}
                  <Link
                    href={""}
                    underline="none"
                    color="orange"
                    cursor="pointer"
                  >
                    {id_data.games.length} games
                  </Link>
                </p>
              </div>
              <div>
                <div className="border-b border-[grey] ml-3"></div>
              </div>
              <p className="font-bold ml-10 mt-3">{id_data.deck}</p>
            </div>
          </div>
        )}
      </div>
      <TabbedInterface Wiki_info={id_data.description} />

      <div />
    </div>
  );
};
export default Character_for_id;
