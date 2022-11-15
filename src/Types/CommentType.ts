import { DataType } from './DataType';
import { CurrentUserType } from "./CurrentUserType"

export interface CommentType {
    item: any
    data: DataType[]
    setData: (data: DataType[]) => void
    user:  CurrentUserType
    modalDelete: boolean
    setModalDelete: (item: boolean) => void
    getModalDelete: (id: number) => void
    getEditComment: (id: number) => void
    editStatus: number | null
    editMessage: string
    getReplyComment: (id: number) => void
    replyCommentId: DataType | null
}