
interface _BusquedaUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Busqueda {

    constructor(

        public nombre: string,
        public _id?: string,
        public usuario?: string,
        public created?: string,
        public estado?: boolean,
        public vacante?: string,
        public detalle?: string,
        public img?: string,
        public puesto?: string,
        public ultimaModificacion?: string,
        public creadoPor?: string,
        public modificadoPor?: string,
        public cliente?: string,

    ) {

    }
}
