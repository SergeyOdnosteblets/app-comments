import { CurrentUserType } from "./CurrentUserType"
import { DataType } from "./DataType"

export interface FormType {
    data: DataType[]
    setData: (data: DataType[]) => void
    user: CurrentUserType
    buttonName: string
    editStatus?: number | null
    editMessage?: string
}