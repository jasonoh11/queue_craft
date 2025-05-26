import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  const clientId = "ed0001afec184c13b5500eaf2dd7ee5b";
  const hasRun = useRef(false);

  useEffect(() => {
	if (hasRun.current) return;
	hasRun.current = true;

	async function getAccessToken(code: string){
		const verifier = localStorage.getItem("code_verifier");
	
		const params = new URLSearchParams();
		params.append("client_id", clientId);
		params.append("grant_type", "authorization_code");
		params.append("code", code);
		params.append("redirect_uri", "http://127.0.0.1:5173/callback");
		params.append("code_verifier", verifier!);
	
		const result = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: params
		});
	
		const data = await result.json();
		if (data.access_token) {
			localStorage.setItem('access_token', data.access_token);
			console.log('Setting to:', data.access_token);
			navigate('/');
		  }
	}

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
	
	if (code) {
		getAccessToken(code);
	} else{
		console.error('No code found in callback URL');
		navigate('/'); // fallback redirect only if no code + no token
	}
  }, [navigate]);

  return <p>Processing login...</p>;
};

export default Callback;
