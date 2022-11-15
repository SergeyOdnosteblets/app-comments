import React, { useState } from 'react';
import { CommentType } from '../../Types/CommentType';

import style from './SingleComment.module.scss';
import plus from './images/icon-plus.svg';
import minus from './images/icon-minus.svg';
import reply from './images/icon-reply.svg';
import del from './images/icon-delete.svg';
import edit from './images/icon-edit.svg';

import maxblagun from './images/avatars/image-maxblagun.png';
import { DataType } from '../../Types/DataType';
import { PostType } from '../../Types/PostType';
import { Form } from '../Form/Form';

export const SingleComment: React.FC<CommentType> = ({
  item,
  data,
  setData,
  user,
  modalDelete,
  setModalDelete,
  getModalDelete,
  onEdit,
  editStatus,
  editMessage,
  onReplyId,
  replyId,
}) => {
  // const [replyPost, setReplyPost] = useState('');

  // const onReply = (id: number) => {
  //   let comments = [...data];
  //   let index = comments.findIndex((item: DataType) => item.id === id);

  //   if (index === -1) {
  //     let res = comments.filter((item: DataType) => item.replies.length);
  //     res.map((item, index) =>
  //       item.replies.filter((post: PostType) => {
  //         if (post.id === id) {
  //           return setReplyPost(comments[index]);
  //         }
  //       }),
  //     );
  //   } else {
  //     return setReplyPost(comments[index]);
  //   }
  // };

  // console.log(replyPost);

  return (
    <>
      <div className={style.card}>
        <div className={style.likes}>
          <img src={plus} alt="" className={style.plus} />
          <p className={style.score}>{item.score}</p>
          <img src={minus} alt="" className={style.plus} />
        </div>
        <div className={style.content}>
          <div className={style.header}>
            <div className={style.info}>
              <img src={maxblagun} alt="" className={style.avatar} />
              <div className={style.userName}>{item.user.username}</div>
              <div className={style.createdAt}>{item.createdAt}</div>
            </div>
            {item.user.username !== user.username ? (
              <div className={style.reply} onClick={() => onReplyId(item.id)}>
                <img src={reply} alt="" className={style.img__reply} />
                <p>Reply</p>
              </div>
            ) : (
              <div className={style.button}>
                <div className={style.reply} onClick={() => getModalDelete(item.id)}>
                  <img src={del} alt="" className={style.img__reply} />
                  <p>Delete</p>
                </div>
                <div className={style.reply} onClick={() => onEdit(item.id)}>
                  <img src={edit} alt="" className={style.img__reply} />
                  <p>Edit</p>
                </div>
              </div>
            )}
          </div>
          <div className={style.post}>{item.content}</div>
        </div>
      </div>
      <div className={style.replies}>
        {item.replies && !!item.replies.length && (
          <div>
            {item.replies.map((item: PostType) => (
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
                {!!replyId && item.id === replyId && (
                  <Form data={data} setData={setData} user={user} buttonName={'Reply'} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
