const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) {
    return "";
  }

  const genreId = selectedGenres.map((item) => item.id);
  return genreId.reduce((a, b) => a.toString() + "," + b.toString());
};

export default useGenres;
