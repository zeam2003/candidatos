import { Busqueda } from './busqueda.model';

interface _CandidatoUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Candidato {

    constructor(


        // Info Personal
        public nombre: string,
        public email?: string,
        // Info Automatica
        public _id?: string,
        public created?: string,
        public imgCandidato?: string,
        public img?: string,
        public ine?: string,
        public rfc?: string,
        public curp?: string,
        public imss?: string,
        public edad?: string,
        public puedeViajar?: boolean,
        public nacionalidad?: string,
        public fechaNacimiento?: string,
        public calle?: string,
        public numeroCalle?: string,
        public ciudad?: string,
        public estadoProvincia?: string,
        public codigoPostal?: string,
        public paisDomicilio?: string,
        public genero?: string,
        public telefono?: string,
        public imgBuesqueda?: string,

        // Usuario y modificaion
        public usuario?: string,
        public estado?: boolean,

        // Busqueda
        public busqueda?: string,
        public cliente?: string,
        public puesto?: string,
        public sitio?: string,
        public vacante?: string,
        public detalleBusqeuda?: string,
        public estadoBusqueda?: string,
        public perfil?: string,
        public ultimaModificacionBúsqueda?: string,
        public creadoBusquedaPor?: string,
        public modificadoBusquedaPor?: string,
       // public cliente?: _CandidatoUser,


    ) {

    }
}




// public apellido: string,

/*public herramientas?: string,
public herramientasSoftware?: string,
public herramientaLP?: string,
public herramientaOS?: string,
public herramientaDB?: string,
public certificaciones?: string,
public seniority?: string,
public idioma?: string,
public ultimoSueldo?: string,
public ultimoEmpleo?: string,
public esquema?: string,
public prestaciones?: string,
public expectativaEconomica?: string,
// public cliente?: string,
public statusProceso?: string,
public ultimoContacto?: string,
public tiempoTranscurrido?: string,
public estadoCandidato?: string,
public observaciones?: string,*/
