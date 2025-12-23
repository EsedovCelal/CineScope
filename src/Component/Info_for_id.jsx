import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "@mui/material";

const Info_for_id = () => {
  const [loading, setLoading] = useState(false);
  const { id, type } = useParams();
  const [id_data, setId_data] = useState(null); // Changed from [] to null
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
  }, [id, type]);

  return (
    <div>
      <div
        className="bg-cover bg-top bg-no-repeat h-[500px] w-full relative"
        style={{
          backgroundImage: id_data?.backdrop_path
            ? `url('https://image.tmdb.org/t/p/original${id_data.backdrop_path}')`
            : "none",
        }}
      >
        <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay */}
        <div className="relative z-10 flex justify-center items-center h-full">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : !id_data ? (
            <p className="text-white">COMING...</p>
          ) : (
            <div className="flex max-w-6xl gap-6">
              <div className="flex-shrink-0">
                <img
                  className="rounded-lg shadow-lg"
                  src={`https://image.tmdb.org/t/p/w300${id_data.poster_path}`}
                  alt={id_data.title || id_data.name}
                />
              </div>
              <div className="text-white">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-1">
                    <h1 className="text-3xl font-bold hover:text-gray-300 cursor-pointer">
                      {id_data.title || id_data.name}
                    </h1>
                    {(id_data.release_date || id_data.first_air_date) && (
                      <h1 className="text-3xl">
                        (
                        {(id_data.release_date || id_data.first_air_date).slice(
                          0,
                          4
                        )}
                        )
                      </h1>
                    )}
                  </div>
                  <button className="border border-gray-400 px-4 py-2 rounded hover:bg-white hover:text-black transition">
                    Follow
                  </button>
                </div>
                <div className="flex">
                  {id_data.genres.map((genre, index) => (
                    <span key={genre.id}>
                      <Link
                        color="common.white"
                        underline="none"
                        sx={{
                          "&:hover": {
                            textDecoration: "underline",
                            color: "grey.400",
                            cursor: "pointer",
                          },
                        }}
                      >
                        {genre.name}
                      </Link>
                      {index < id_data.genres.length - 1 && " and "}
                    </span>
                  ))}
                </div>
                <div></div>
                <div></div>
                <div>
                  <p>{id_data.tagline}</p>
                </div>
                <div>
                  <p className="font-bold mt-5 text-xl mb-2.5">Overview</p>
                  <h1>{id_data.overview || id_data.deck}</h1>
                </div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info_for_id;
