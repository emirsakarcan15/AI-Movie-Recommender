import React, { useEffect } from 'react'
import { toast } from 'sonner';

function Recommendations({recommendations}: {recommendations: any}) {

  const [filmResponses, setFilmResponses] = React.useState([]);

  const fetchRecommendations = async () => {
    recommendations.films = recommendations.films.map((film: any) => film.title);

    try {
      const response = await fetch("http://localhost:3000/films", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ films: recommendations.films }),
      });
    if (response.ok) {
      const data = await response.json();
      setFilmResponses(data);
    } else {
      toast.error("Failed to fetch film details. Please try again.");
    }
    } catch (error) {
      toast.error("An error occurred while fetching film details. Please try again.");
    }
  }

useEffect(() => {
    fetchRecommendations();
  }, []);


  return (
    <div>{recommendations.films.map((film: any) => <div key={film.title}> <p>{film.title}</p></div>)}</div>
  )
}

export default Recommendations