export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
  
    if (!refreshToken) {
      return null;
    }
  
    const response = await fetch("http://0.0.0.0:8000/api/auth/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
  
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      return data.access;
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }
  };
  