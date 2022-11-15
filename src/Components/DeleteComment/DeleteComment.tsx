import React from 'react';
import { DeleteCommentType } from '../../Types/DeleteCommentType';

import style from './DeleteComment.module.scss';

export const DeleteComment: React.FC<DeleteCommentType> = ({ onButtonCancel, onButtonDelete }) => {
  return (
    <div className={style.modal}>
      <div className={style.title}>Delete Comment</div>
      <div className={style.text}>
        Are you sure you want to delete this comment? This wll remove the comment and can't undone
      </div>
      <div>
        <button className={`${style.buttons} ${style.button__no}`} onClick={() => onButtonCancel()}>
          No, Cancel
        </button>
        <button
          className={`${style.buttons} ${style.button__yes}`}
          onClick={() => onButtonDelete()}>
          Yes, Delete
        </button>
      </div>
    </div>
  );
};
