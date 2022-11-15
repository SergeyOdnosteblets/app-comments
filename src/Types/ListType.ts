import { CurrentUserType } from "./CurrentUserType"
import { DataType } from "./DataType"

export interface ListType {
    data: DataType[]
    setData: (data: DataType[]) => void
    user: CurrentUserType
}