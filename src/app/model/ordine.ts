import { Cliente } from "./cliente"
import { Pizza } from "./pizza"
import { User } from "./user"

export interface Ordine {
    id?: number
    data?: any
    codice?: string
    costoTotale?: number
    closed?: boolean
    cliente?: Cliente
    fattorino?: User
    pizze?: Pizza[]
}
