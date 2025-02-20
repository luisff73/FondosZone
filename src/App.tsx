// import { useState } from "react"; // Importamos los hooks useState y useEffect
import './index.css';  // Importamos el fichero de estilos css personalizado que carga los estilos de tailwind.
import StockData from './components/stockData.tsx'; // Importa el nuevo componente

// Componente principal de la aplicación

function App() {
  // const [peliculas, setPeliculas] = useState<interfacePelicula[]>([]); // Estado para almacenar las películas "peliculas" es una variable que almacenara las peliculas y setPeliculas lo utilizamos para actualizar el valor de la variable Peliculas
  // const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<interfacePelicula | null>(null); // Estado para almacenar la película seleccionada para actualizar la asignamos a null al principio.
  // const [generos, setGeneros] = useState<interfaceGeneros[]>([]);
  // const [generoSeleccionado, setGeneroSeleccionado] = useState<interfaceGeneros | null>(null);
 
  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto bg-black">
      <div>
        <h1 className="text-4xl font-bold text-gray-500 text-center my-8">
          Stocks
        </h1>       
        
        {/* Mostrar datos de la API de Yahoo Finance */}
        <StockData />
      </div>

    </main>
  );
}

// aqui definimos y exportamos la colección pelicula para evitar errores posteriores en typescript.
export interface interfacePelicula {
  id: number;
  image: string;
  name: string;
  year: number;
  genero: string;
}

export interface interfaceGeneros {
  id:number;
  name:string;
}

export default App;
