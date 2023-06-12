const mediaType = {
  movie: "movie",
  tv: "tv"
};

const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated"
};

const backdropPath = (imgEndpoint) => `https://image.tmdb.org/t/p/original${imgEndpoint}`;   //URL για ανάκτηση backdrop από το TMDB
const posterPath = (imgEndpoint) => `https://image.tmdb.org/t/p/w500${imgEndpoint}`;      //URL για ανάκτηση poster από το TMDB
const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;    //URL για ανάκτηση βίντεο από το youtube


//Το object tmdbConfigs περιέχει σταθερές και μεθόδους που σχετίζονται με την απεικόνιση πολυμέσων από το TMDB API και το youtube
const tmdbConfigs = {mediaType, mediaCategory, backdropPath, posterPath, youtubePath};

export default tmdbConfigs;