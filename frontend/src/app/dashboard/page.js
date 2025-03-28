"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login"); // Redirige al login si no hay sesión
    } else {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    const response = await fetch("http://0.0.0.0:8000/api/auth/token/verify/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      setUser("Usuario autenticado");
    } else {
      localStorage.removeItem("accessToken");
      router.push("/login");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Bienvenido al Dashboard</h1>
      {user ? <p>{user}</p> : <p>Cargando...</p>}
    </div>
  );
}
