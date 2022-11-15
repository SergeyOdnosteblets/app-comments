import React, { useState } from 'react';
import { CommentType } from '../../Types/CommentType';

import style from './SingleComment.module.scss';
import plus from './images/icon-plus.svg';
import minus from './images/icon-minus.svg';
import reply from './images/icon-reply.svg';
import del from './images/icon-delete.svg';
import edit from './images/icon-edit.svg';

import maxblagun from './images/avatars/image-maxblagun.png';
import userLogo from './images/avatars/image-juliusomo.png';

import { PostType } from '../../Types/PostType';
import { Form } from '../Form/Form';
import { DataType } from '../../Types/DataType';

export const SingleComment: React.FC<CommentType> = ({
  item,
  data,
  setData,
  user,
  modalDelete,
  setModalDelete,
  getModalDelete,
  getEditComment,
  editStatus,
  editMessage,
  getReplyComment,
  replyCommentId,
}) => {
  const [votePlus, setVotePlus] = useState<number[]>([]);
  const [voteMinus, setVoteMinus] = useState<number[]>([]);

  const onPlus = (data: DataType[], id: number) => {
    setData(
      data.map((item: any) => {
        if (item.id === id && !votePlus.includes(id)) {
          item.score = ++item.score;
          if (!voteMinus.includes(id)) {
            setVotePlus([...votePlus, id]);
          }
          setVoteMinus(voteMinus.filter((item) => item !== id));
          return item;
        } else {
          item.replies && item.replies.length && onPlus(item.replies, id);
          return item;
        }
      }),
    );
  };

  const onMinus = (data: DataType[], id: number) => {
    setData(
      data.map((item: any) => {
        if (item.id === id && !voteMinus.includes(id)) {
          item.score = --item.score;

          if (!votePlus.includes(id)) {
            setVoteMinus([...voteMinus, id]);
          }
          setVotePlus(votePlus.filter((item) => item !== id));
          return item;
        } else {
          item.replies && item.replies.length && onMinus(item.replies, id);
          return item;
        }
      }),
    );
  };

  return (
    <>
      <div className={style.card}>
        <div className={style.likes}>
          <img src={plus} alt="" className={style.plus} onClick={() => onPlus(data, item.id)} />
          <p className={style.score}>{item.score}</p>
          <img src={minus} alt="" className={style.plus} onClick={() => onMinus(data, item.id)} />
        </div>
        <div className={style.content}>
          <div className={style.header}>
            <div className={style.info}>
              <img
                src={item.user.username === user.username ? userLogo : maxblagun}
                alt=""
                className={style.avatar}
              />
              <div className={style.userName}>{item.user.username}</div>
              <div className={style.createdAt}>{item.createdAt}</div>
            </div>
            {item.user.username !== user.username ? (
              <div className={style.reply} onClick={() => getReplyComment(item.id)}>
                <img src={reply} alt="" className={style.img__reply} />
                <p>Reply</p>
              </div>
            ) : (
              <div className={style.button}>
                <div className={style.reply} onClick={() => getModalDelete(item.id)}>
                  <img src={del} alt="" className={style.img__reply} />
                  <p>Delete</p>
                </div>
                <div className={style.reply} onClick={() => getEditComment(item.id)}>
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
          </div>
        )}
      </div>
    </>
  );
};
