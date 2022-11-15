import React from 'react';
import { DeleteCommentType } from '../../Types/DeleteCommentType';

import style from './DeleteModal.module.scss';

export const DeleteModal: React.FC<DeleteCommentType> = ({ onCancelModal, onDeleteModal }) => {
  return (
    <div className={style.modal}>
      <div className={style.title}>Delete Comment</div>
      <div className={style.text}>
        Are you sure you want to delete this comment? This wll remove the comment and can't undone
      </div>
      <div>
        <button className={`${style.buttons} ${style.button__no}`} onClick={() => onCancelModal()}>
          No, Cancel
        </button>
        <button
          className={`${style.buttons} ${style.button__yes}`}
          onClick={() => onDeleteModal()}>
          Yes, Delete
        </button>
      </div>
    </div>
  );
};
