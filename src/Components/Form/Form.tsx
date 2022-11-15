import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DataType } from '../../Types/DataType';
import { FormType } from '../../Types/FormType';

import style from './Form.module.scss';

type FormValues = {
  post: string;
};

export const Form: React.FC<FormType> = ({
  data,
  setData,
  user,
  buttonName,
  editStatus,
  editMessage,
}) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (text) => {
    if (!editStatus) {
      let newPost = {
        id: Math.random() * 100,
        content: text.post,
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
      setData([...data, newPost]);
    } else {
      let comments = [...data];
      let index = comments.findIndex((item: DataType) => item.id === editStatus);

      if (index === -1) {
        setData(
          comments.map((item) => {
            if (item.id === editStatus) {
              item.content = text.post;
              return item;
            } else {
              item.replies &&
                item.replies.length &&
                item.replies.map((post: any) => {
                  if (post.id === editStatus) {
                    post.content = text.post;
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
              item.content = text.post;
              return item;
            } else {
              return item;
            }
          }),
        );
      }
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
