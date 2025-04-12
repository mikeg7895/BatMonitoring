"use client";
import { useState } from "react";
import { MoreHorizontal, Users, Smartphone, BarChart2, Plus } from "lucide-react";

const proyectosIniciales = [
  {
    id: 1,
    nombre: "Monitoreo Urbano Norte",
    estado: "Activo",
    descripcion: "Estudio de murciélagos en zona urbana norte",
    miembros: 3,
    dispositivos: 5,
    grabaciones: 128,
    actualizado: "hace 2 días",
  },
  {
    id: 2,
    nombre: "Reserva Natural Este",
    estado: "Activo",
    descripcion: "Monitoreo en reserva natural protegida",
    miembros: 5,
    dispositivos: 8,
    grabaciones: 256,
    actualizado: "hace 3 días",
  },
  {
    id: 3,
    nombre: "Cueva Las Golondrinas",
    estado: "Pausado",
    descripcion: "Estudio de población en cueva",
    miembros: 2,
    dispositivos: 3,
    grabaciones: 64,
    actualizado: "hace 7 días",
  },
];

export default function Proyectos() {
  const [filtro, setFiltro] = useState("Todos");

  const proyectosFiltrados =
    filtro === "Todos" ? proyectosIniciales : proyectosIniciales.filter((p) => p.estado === filtro);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proyecto
        </button>
      </div>
      <p className="text-gray-600 mb-6">Gestione sus proyectos de monitoreo de murciélagos.</p>

      {/* Filtros */}
      <div className="mb-6 flex space-x-2">
        {["Todos", "Activo", "Pausado", "Archivado"].map((estado) => (
          <button
            key={estado}
            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
              filtro === estado ? "bg-black text-white" : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setFiltro(estado)}
          >
            {estado}
          </button>
        ))}
      </div>

      {/* Lista de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectosFiltrados.map((proyecto) => (
          <div key={proyecto.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden p-5 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{proyecto.nombre}</h3>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                proyecto.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {proyecto.estado}
              </span>
              <span className="ml-2 text-sm text-gray-500">{proyecto.actualizado}</span>
            </div>
            <p className="text-gray-600 mb-4">{proyecto.descripcion}</p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <InfoCard icon={Users} value={proyecto.miembros} label="Miembros" />
              <InfoCard icon={Smartphone} value={proyecto.dispositivos} label="Dispositivos" />
              <InfoCard icon={BarChart2} value={proyecto.grabaciones} label="Grabaciones" />
            </div>

            <button className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              Ver Proyecto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
      <div className="flex items-center justify-center mb-1">
        <Icon className="h-5 w-5 text-gray-500" />
      </div>
      <span className="text-lg font-bold">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
