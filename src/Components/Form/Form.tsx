import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DataType } from '../../Types/DataType';
import { FormType } from '../../Types/FormType';
import { FormValues } from '../../Types/FormValues';

import style from './Form.module.scss';

export const Form: React.FC<FormType> = ({
  data,
  setData,
  user,
  buttonName,
  editStatus,
  editMessage,
  replyCommentId,
}) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (message) => {
    let newPost = {
      id: Math.random() * 100,
      content: message.post,
      createdAt: new Date().toDateString(),
      score: 0,
      user: {
        image: {
          png: user.image.png,
          webp: user.image.webp,
        },
        username: user.username,
      },
      replies: [],
    };

    if (buttonName === 'Send') {
      setData([...data, newPost]);
    } else if (buttonName === 'Update') {
      let comments = [...data];
      let index = comments.findIndex((item: DataType) => item.id === editStatus);

      if (index === -1) {
        setData(
          comments.map((item) => {
            if (item.id === editStatus) {
              item.content = message.post;
              return item;
            } else {
              item.replies &&
                item.replies.length &&
                item.replies.map((post) => {
                  if (post.id === editStatus) {
                    post.content = message.post;
                    return post;
                  }
                  return post;
                });
              return item;
            }
          }),
        );
      } else {
        setData(
          comments.map((item: DataType) => {
            if (item.id === editStatus) {
              item.content = message.post;
              return item;
            } else {
              return item;
            }
          }),
        );
      }
    } else if (buttonName === 'Reply' && replyCommentId) {
      let comments = [...data];

      setData(
        comments.map((item: any) => {
          if (item.id === replyCommentId.id) {
            item.replies = [...item.replies, newPost];
            return item;
          }
          return item;
        }),
      );
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <input
        className={style.input}
        {...register('post')}
        defaultValue={buttonName === 'send' ? '' : editMessage}
      />
      <button className={style.button} type="submit">
        {buttonName}
      </button>
    </form>
  );
};
