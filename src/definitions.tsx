// aqui definimos y exportamos la colección pelicula para evitar errores posteriores en typescript.
export interface interfacePelicula {
  id: number;
  image: string;
  name: string;
  year: number;
  genero: string;
}

export interface interfaceGeneros {
  id: number;
  name: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  type: "admin" | "user";
};


export interface Fondo {
  id: number;
  nombre: string;
  valor: number;
  fecha: Date;
}

export interface interfacePelicula {
  id: number;
  image: string;
  name: string;
  year: number;
  genero: string;
}
