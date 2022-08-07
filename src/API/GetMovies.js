export function GetMovies() {
  return async () => {
    const API_KEY = "5e83d3463b244867eab265ed5e141d03";

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const jsonData = await data.json();
      return jsonData;
    } catch (e) {
      throw new Error(e.message);
    }
  };
}
