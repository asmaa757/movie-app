import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { Heart } from 'lucide-react';
import { Star } from 'lucide-react';
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import MovieCard from "./components/MovieCard";
import ReviewCard from "./components/ReviewCard";

function MovieDetails(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [movie , setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [reviews , setReviews] = useState([]);
    const [liked, setLiked] = useState(false);
    const IMG_URl = "https://image.tmdb.org/t/p/w500";
    const API_KEY ="ef6076a5b0f5c7aea41ffa3701f78452";
    useEffect(()=>{
        //====== Movie Details ========
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then((response)=> response.json()).then((data)=>{
            setMovie(data)
        }).catch((error)=>{
            console.log(error)
        });
        //====== Recommendations ========
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`)
        .then((response)=> response.json()).then((data)=>{
            setRecommendations(data.results)
        }).catch((error)=>{
            console.log(error)
        });
        //====== Reviews ========
        fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`)
        .then((response)=> response.json()).then((data)=>{
            setReviews(data.results)
        }).catch((error)=>{
            console.log(error)
        });
    },[id]);
    if(!movie){
        return <p className="mt-20 text-center">Loading...</p>
    }
    return(
        <div className="movie-details">
        <Link to="/" className="back-btn">
            <ArrowLeft size={20} />
            Back
        </Link>
            {/*==== Movie Details========*/}
            <section className="movie-info">
                <div className="movie-poster">
                    <img src={`${IMG_URl}${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="movie-content">
                    <div className="movie-header">
                        <h1>{movie.title}</h1>
                        <p>{movie.release_date}</p>
                        <button onClick={() => setLiked(!liked)}>
                            <Heart fill={liked ? "red" : "none"}
                                color={liked ? "red" : "black"}/>
                        </button>
                    </div>
                    <div className="rating">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star}
                                    fill={
                                        movie.vote_average >= star * 2 ? "#f5c518": "none"
                                    }
                                    color="#f5c518"/>
                            ))}
                        </div>
                        <span>{movie.vote_average}</span>
                    </div>
                    <p className="overvieew">
                        {movie.overview}
                    </p>
                    <div className="genres">{movie.genres?.map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                    ))}
                   </div>
                   <div className="movie-meta">
                        <div>
                            <b>Duration:</b>
                            <span>{movie.runtime} Min.</span>
                        </div>

                        <div>
                            <b>Languages:</b>
                            <span>
                                {movie.spoken_languages?.map((language) => language.english_name).join(", ")}
                            </span>
                        </div>
                    </div>
                    {movie.production_companies?.[0]?.logo_path && (
                        <div className="production-company">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.production_companies[0].logo_path}`}
                                alt={movie.production_companies[0].name}
                            />
                        </div>
                    )}
                    {movie.homepage && (
                        <a href={movie.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="website-btn">
                            Website ↗
                        </a>
                    )}
                </div>
            </section>
            {/*==== Recommendation ========*/}
            <section className="recommendations">
                <h2>Recommendation</h2>
                <div className="recommendations-grid">
                    {recommendations.map((movie)=>(
                        <MovieCard key={movie.id}
                                movie={movie}
                                className="recommendation-card" />
                    ))}
                </div>
            </section>
            {/*==== Recommendation ========*/}
            <section className="reviews">
                <h2>Reviews</h2>
                <div className="reviews-list">
                        {reviews.map((review)=>(
                            <ReviewCard key={review.id}
                                        review={review}  />
                        ))}
                </div>
            </section>
        </div>
    )
}
export default MovieDetails;