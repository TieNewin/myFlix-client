import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("https://tyflixdb-abb12f7ad46c.herokuapp.com/movies")
          .then((response) => response.json())
          .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    id: movie._id,
                    Title: movie.Title,
                    Description: movie.Description,
                    Genre: movie.Genre.Name, 
                    Director: movie.Director.Name,
                    ImagePath: movie.ImagePath,
                    Featured: movie.Featured
                };
            });

            setMovies(moviesFromApi);
          });
    }, []);

    if (!user) {
        return <LoginView onLoggedIn={(user) => setUser(user)} />;
    }

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
            <button onClick = {() => { setUser(null); }}>Logout</button>
        </div>
    );
  };