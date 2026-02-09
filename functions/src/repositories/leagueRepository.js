import fs from 'fs/promises';

const obtenerDatos = async () => {
  const data = await fs.readFile("prueba.json", "utf-8");
  return JSON.parse(data);
}

export { obtenerDatos, }