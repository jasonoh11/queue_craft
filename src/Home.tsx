function Home() {

  const fetchTopTracks = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    console.log('Top Tracks:', data.items);
  };
  return (
    <>
      <button onClick={fetchTopTracks}>Get top tracks</button>
    </>
  )
}

export default Home;