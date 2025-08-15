const API_KEY = "reqres-free-v1";

export async function loginUser(email, password) {
  const res = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers:{ 
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}