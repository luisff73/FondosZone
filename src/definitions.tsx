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

  