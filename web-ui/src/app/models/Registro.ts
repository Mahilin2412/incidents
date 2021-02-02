export interface Registro {
    id?: number;
    fecha ?: Date;
    fk_incidente?: string;
    relacionado?: string;
    usuario?: string;
    pkfk_id_producto?: number
}

