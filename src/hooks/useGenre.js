// Custom hook
// Used to get selectedGenre's id to make an API call
// Will be used in Home component to fetch movies with specific genre ID

const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) {
    return "";
  }

  const genreId = selectedGenres.map((item) => item.id);
  return genreId.reduce((a, b) => a.toString() + "," + b.toString());
};

export default useGenres;
