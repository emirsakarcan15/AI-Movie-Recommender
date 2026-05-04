import React, { useEffect } from 'react'
import { toast } from 'sonner';

function Recommendations({recommendations}: {recommendations: any}) {

  const fetchRecommendations = async () => {
    try {
      const response = await fetch("http://localhost:3000/recommend", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
      else {
        toast.error("Failed to fetch recommendations. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching recommendations. Please try again.");
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