"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash, rotate } from "@/app/utils/Icons";
import React, { useState } from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";
import Modal from "../Modals/Modal";
import EditContent from "../Modals/EditContent";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: string;
  permaDelete?: boolean;
}

function TaskItem({ title, description, date, isCompleted, isImportant, id, permaDelete }: Props) {
  const { theme, deleteTask, updateTask, permaDeleteTask, restoreDeletedTask } = useGlobalState();
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <TaskItemStyled theme={theme}>
      {modal && <Modal closeModalP={closeModal} content={<EditContent titleP={title} dateP={date} descriptionP={description} isCompleted={isCompleted} id={id} isImportant={isImportant} />} />}
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}
        {permaDelete ? <button className="restore" onClick={() => {
            restoreDeletedTask(id);
          }}>{rotate}</button> : <></>}
        <button className="edit" onClick={openModal}>{edit}</button>
        <button
          className="delete"
          onClick={() => {
            if (permaDelete) {
              permaDeleteTask(id);
              return;
            }
            const task = {
                id,
                isCompleted: !isCompleted,
              };

            deleteTask(task);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  color: ${(props) => props.theme.titleColor};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem;
