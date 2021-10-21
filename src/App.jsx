import { useEffect, useState } from "react";
import { useQuery } from "react-query";

// https://api-allocine.herokuapp.com/api/movies/popular
// https://api-allocine.herokuapp.com/api/movies/upcoming
// https://api-allocine.herokuapp.com/api/movies/top_rated

export function App() {
  const [tab, setTab] = useState("popular"); // 'upcoming' | 'top_rated'
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    [tab, page],
    () =>
      fetch(`https://api-allocine.herokuapp.com/api/movies/${tab}?p=${page}`)
        .then((res) => res.json())
        .then((a) => new Promise((r) => setTimeout(() => r(a), 1000))),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  return (
    <div>
      <nav>
        <button
          onClick={() => {
            setTab("popular");
            setPage(1);
          }}
          style={{ background: tab === "popular" ? "DarkBlue" : "none" }}
        >
          Popular
        </button>
        <button
          onClick={() => {
            setTab("top_rated");
            setPage(1);
          }}
          style={{ background: tab === "top_rated" ? "DarkBlue" : "none" }}
        >
          Top Rated
        </button>
        <button
          onClick={() => {
            setTab("upcoming");
            setPage(1);
          }}
          style={{ background: tab === "upcoming" ? "DarkBlue" : "none" }}
        >
          Upcoming
        </button>
      </nav>
      {data ? (
        <div>
          {Array.from({ length: data.total_pages }, (_, i) => i + 1)
            .slice(Math.max(0, page - 6), Math.min(data.total_pages, page + 5))
            .map((num) => (
              <button
                onClick={() => {
                  setPage(num);
                }}
                style={{ background: page === num ? "DarkBlue" : "none" }}
              >
                {num}
              </button>
            ))}
        </div>
      ) : null}
      {isLoading ? <p>Loading...</p> : null}
      <div>
        {data
          ? data.results.map((movie) => <div key={movie.id}>{movie.title}</div>)
          : null}
      </div>
    </div>
  );
}
