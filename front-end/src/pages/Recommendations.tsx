import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, User, Users } from "lucide-react";
import FadeContent from "@/components/FadeContent";
import { Button } from "@/components/ui/button";


const formatVotes = (n: number) => new Intl.NumberFormat("tr-TR").format(n)

function Recommendations({recommendations, isSearched}: {recommendations: any, isSearched: boolean}) {

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
  }, [isSearched]);

  return (
    <div >

      <main className="flex-1 px-6 py-10 max-w-7xl mx-auto w-full">
        <FadeContent blur duration={600}>
          <div className="text-center mb-14 space-y-3">
            <h2 className="font-display text-4xl md:text-6xl font-light">Our picks for you</h2>
            <p className="font-body text-sm text-muted-foreground tracking-wide">
              Three suggestions you can watch tonight
            </p>
          </div>
        </FadeContent>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {filmResponses.map((m, i) => (
            <FadeContent key={m.title} blur duration={700} delay={150 + i * 150}>
              <article className="group flex flex-col sm:flex-row bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 hover:border-white hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.6)]">
                <div className="relative sm:w-56 sm:shrink-0 aspect-[2/3] sm:aspect-auto overflow-hidden bg-muted">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                    alt={`${m.title} film posteri`}
                    width={512}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-body text-xs font-medium">{m.vote_average.toFixed(2)}</span>
                  </div>                  
                </div>

                <div className="flex-1 p-6 flex flex-col gap-4">
                  <div className="space-y-1">
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                     {m.release_date.split("-")[0]}
                    </p>
                    <h3 style={{ "marginTop": "30px" }} className="font-display text-2xl font-medium leading-tight">{m.title}</h3>
                  </div>

                  <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                    {m.overview}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border flex-wrap gap-3">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span className="font-body text-xs">{formatVotes(m.vote_count)} vote(s)</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="font-body text-xs">
                      Details
                    </Button>
                  </div>
                </div>
              </article>
            </FadeContent>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Recommendations