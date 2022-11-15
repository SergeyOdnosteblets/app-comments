import React, { useState, useEffect } from 'react';
import { DataType } from '../../Types/DataType';
import { ListType } from '../../Types/ListType';
import { PostType } from '../../Types/PostType';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { Form } from '../Form/Form';
import { SingleComment } from '../SingleComment/SingleComment';

import style from './ListComments.module.scss';

export const ListComments: React.FC<ListType> = ({ data, setData, user }) => {
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<number | null>(null);
  const [editMessage, setEditMessage] = useState<string>('');
  const [replyCommentId, setReplyCommentId] = useState<DataType | null>(null);

  const getModalDelete = (id: number) => {
    !modalDelete && setDeleteId(id);
    setModalDelete(!modalDelete);
  };

  const onDeleteModal = () => {
    setData(getDeleteComment(data, deleteId));
    setDeleteId(null);
    setModalDelete(!modalDelete);
  };

  const onCancelModal = () => {
    setDeleteId(null);
    setModalDelete(!modalDelete);
  };

  const getDeleteComment = (arr: any, id: number | null) => {
    const deletedData = arr.filter((item: DataType) => {
      if (item.id !== id && item.replies && item.replies.length) {
        return getDeleteComment(item.replies, id);
      }
      return item.id !== id;
    });
    deletedData.map((item: DataType) => {
      if (item.replies) {
        item.replies = getDeleteComment(item.replies, id);
        return item;
      }
    });
    return deletedData;
  };

  const getEditComment = (id: number) => {
    setEditStatus(id);

    let comments = [...data];
    let index = comments.findIndex((item: DataType) => item.id === id);

    if (index === -1) {
      let res = comments.filter((item: DataType) => item.replies.length);
      res.map((item) =>
        item.replies.filter((post: PostType) => {
          if (post.id === id) {
            setEditMessage(post.content);
          }
        }),
      );
    } else {
      setEditMessage(comments[index].content);
    }
  };

  const getReplyComment = (id: number) => {
    let comments = [...data];
    let index = comments.findIndex((item: DataType) => item.id === id);

    if (index === -1) {
      let res = comments.filter((item: DataType) => item.replies.length);
      res.map((item, index) =>
        item.replies.filter((post: PostType) => {
          if (post.id === id) {
            return setReplyCommentId(comments[index]);
          }
        }),
      );
    } else {
      return setReplyCommentId(comments[index]);
    }
  };

  useEffect(() => {
    setEditStatus(null);
    setEditMessage('');
    setReplyCommentId(null);
  }, [data]);

  return (
    <div className={style.comments}>
      {data.map((item: DataType) => (
        <div key={item.id}>
          <SingleComment
            item={item}
            data={data}
            setData={setData}
            user={user}
            modalDelete={modalDelete}
            setModalDelete={setModalDelete}
            getModalDelete={getModalDelete}
            getEditComment={getEditComment}
            editStatus={editStatus}
            editMessage={editMessage}
            getReplyComment={getReplyComment}
            replyCommentId={replyCommentId}
          />

          {!!editStatus && item.id === editStatus && (
            <Form
              data={data}
              setData={setData}
              user={user}
              buttonName={'Update'}
              editStatus={editStatus}
              editMessage={editMessage}
            />
          )}
          {!!replyCommentId && item.id === replyCommentId.id && (
            <Form
              data={data}
              setData={setData}
              user={user}
              buttonName={'Reply'}
              replyCommentId={replyCommentId}
            />
          )}
        </div>
      ))}
      {modalDelete && <DeleteModal onCancelModal={onCancelModal} onDeleteModal={onDeleteModal} />}
    </div>
  );
};
