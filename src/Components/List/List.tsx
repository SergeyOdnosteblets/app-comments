import React, { useState, useEffect } from 'react';
import { DataType } from '../../Types/DataType';
import { ListType } from '../../Types/ListType';
import { PostType } from '../../Types/PostType';
import { DeleteComment } from '../DeleteComment/DeleteComment';
import { Form } from '../Form/Form';
import { SingleComment } from '../SingleComment/SingleComment';

import style from './List.module.scss';

export const List: React.FC<ListType> = ({ data, setData, user }) => {
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<number | null>(null);
  const [editMessage, setEditMessage] = useState<string>('');
  const [replyId, setReplyId] = useState<number | null>(null);

  const getModalDelete = (id: number) => {
    !modalDelete && setDeleteId(id);
    setModalDelete(!modalDelete);
  };

  const onDelete = (arr: any, id: any) => {
    const x = arr.filter((item: any) => {
      if (item.id !== id && item.replies && item.replies.length) {
        return onDelete(item.replies, id);
      }
      return item.id !== id;
    });
    x.map((item: any) => {
      if (item.replies) {
        item.replies = onDelete(item.replies, id);
        return item;
      }
    });
    return x;
  };

  const onButtonDelete = () => {
    setData(onDelete(data, deleteId));
    setDeleteId(null);
    setModalDelete(!modalDelete);
  };

  const onButtonCancel = () => {
    setDeleteId(null);
    setModalDelete(!modalDelete);
  };

  const onEdit = (id: number) => {
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

  const onReplyId = (id: number) => {
    console.log(id);
    setReplyId(id);
  };

  useEffect(() => {
    setEditStatus(null);
    setEditMessage('');
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
            onEdit={onEdit}
            editStatus={editStatus}
            editMessage={editMessage}
            onReplyId={onReplyId}
            replyId={replyId}
          />

          {!!replyId && item.id === replyId && (
            <Form data={data} setData={setData} user={user} buttonName={'Reply'} />
          )}
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
        </div>
      ))}
      {modalDelete && (
        <DeleteComment onButtonCancel={onButtonCancel} onButtonDelete={onButtonDelete} />
      )}
    </div>
  );
};
