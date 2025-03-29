import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">BatMonitor</h1>
        <div className="space-x-4">
          <a href="/login" className="text-gray-700 hover:text-black">Iniciar Sesión</a>
          <a href="/register" className="bg-black text-white px-4 py-2 rounded">Registrarse</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20 px-6">
        <h2 className="text-4xl font-bold">Monitoreo de Murciélagos en Tiempo Real</h2>
        <p className="text-gray-600 mt-4 max-w-2xl">
          Plataforma avanzada para el seguimiento, análisis y gestión de datos de murciélagos.
          Visualice patrones, comparta proyectos y tome decisiones basadas en datos.
        </p>
        <div className="mt-6 space-x-4">
          <a href="/comenzar" className="bg-black text-white px-6 py-3 rounded-lg">Comenzar ahora →</a>
          <a href="/demo" className="border border-gray-700 px-6 py-3 rounded-lg">Ver demostración</a>
        </div>
      </div>

      {/* Imagen (Simulación de datos) */}
      <div className="flex justify-center mt-10">
        <img src="/heatmap-example.jpg" alt="Mapa de calor" className="w-1/2 rounded-lg shadow-lg" />
      </div>

      {/* Pie de Página */}
      <footer className="mt-16 py-6 text-center text-gray-600">
        <p>© 2025 BatMonitor - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default LandingPage;
