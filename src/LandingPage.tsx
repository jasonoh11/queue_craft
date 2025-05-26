function LandingPage(){

	const handleLogin = async () => {
		const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
		const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
		const scopes = import.meta.env.VITE_SPOTIFY_SCOPES;    
	
		const codeVerifier = generateRandomString(64);
		const codeChallenge = await generateCodeChallenge(codeVerifier);
		localStorage.setItem('code_verifier', codeVerifier);
	
		const args = new URLSearchParams({
		  response_type: 'code',
		  client_id: clientId,
		  scope: scopes,
		  code_challenge_method: 'S256',
		  code_challenge: codeChallenge,
		  redirect_uri: redirectUri,
		});
	
		window.location.href = `https://accounts.spotify.com/authorize?${args.toString()}`;
	  };


	return (
		<>
			<h1>Welcome to QueueCraft!</h1>
			<button onClick={handleLogin}>Login</button>
		</>
	)
}

function generateRandomString(length: number): string {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const values = crypto.getRandomValues(new Uint8Array(length));
	return Array.from(values).map(x => possible[x % possible.length]).join('');
  }
  
  async function generateCodeChallenge(codeVerifier: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await crypto.subtle.digest('SHA-256', data);
	return btoa(String.fromCharCode(...new Uint8Array(digest)))
	  .replace(/=/g, '')
	  .replace(/\+/g, '-')
	  .replace(/\//g, '_');
  }

export default LandingPage;