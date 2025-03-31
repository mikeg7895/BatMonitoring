import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { nombre, apellido, email, username, password } = await req.json();

    if (!nombre || !apellido || !email || !username || !password) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Simulación de guardado en base de datos (debes conectar a una DB real)
    const newUser = { nombre, apellido, email, username, password: hashedPassword };
    console.log("Usuario registrado:", newUser);

    return NextResponse.json({ message: "Usuario registrado con éxito" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
