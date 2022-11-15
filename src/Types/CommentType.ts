import { DataType } from './DataType';
import { CurrentUserType } from "./CurrentUserType"

export interface CommentType {
    item: any
    data: any
    setData: (data: DataType[]) => void
    user:  CurrentUserType
    modalDelete: boolean
    setModalDelete: (item: boolean) => void
    getModalDelete: (id: number) => void
    onEdit: (id: number) => void
    editStatus: number | null
    editMessage: string
    onReplyId: (id: number) => void
    replyId: number | null
}