import { Cliente } from "./cliente"
import { User } from "./user"

export interface Ordine {
    id?: number
    data?: any
    codice?: string
    costoTotale?: number
    closed?: boolean
    cliente?: Cliente
    fattorino?: User
    pizzaIds?: number[]
}
