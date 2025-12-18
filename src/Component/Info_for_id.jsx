/* import TabbedInterface from "./TabbedInterface"; */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronsRight } from "lucide-react";
import { Link } from "@mui/material";
const Info_for_id = () => {
  const [loading, setLoading] = useState(false);
  const { id, type } = useParams();
  const [id_data, setId_data] = useState([]);
  const [error, setError] = useState(null);
  console.log(id_data);
  useEffect(() => {
    const fetch_for_id = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/${type}/${id}`);
        const data = await res.json();
        setId_data(data);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch_for_id();
  }, [id]);
  return (
    <div>
      <div
        className={`bg-[url('https://image.tmdb.org/t/p/w300_and_h450_face${id_data.backdrop_path}')] bg-cover bg-center bg-no-repeat w-full h-64`}
      >
        <div className="flex justify-center items-center h-[500px] bg-[#12151a]">
          {!id_data || id_data.length === 0 ? (
            <p> COMING...</p>
          ) : (
            <div className="flex max-w-6xl">
              <div>
                <img
                  className=""
                  src={`https://image.tmdb.org/t/p/w300_and_h450_face${id_data.poster_path}`}
                  alt={id_data.title}
                />
              </div>
              <div>
                <div className="flex justify-between ">
                  <p className="text-3xl mb-5 ml-10 hover:text-[grey] cursor-pointer">
                    {id_data.title}
                  </p>
                  <button className="border border-[grey] h-full cursor-pointer w-30">
                    follow
                  </button>
                </div>
                {/*  <div className="flex items-center mb-5">
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
              </div> */}
                <p className="font-bold ml-10 mt-3">{id_data.deck}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/*       <TabbedInterface info_for_id={id_data} type={"Character"} /> */}
      <div />
    </div>
  );
};
export default Info_for_id;
