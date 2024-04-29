"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { add, plus } from "@/app/utils/Icons";
import DatePicker from "react-datepicker";
import CreateContent from "./CreateContent";

function CalendarModal() {
  const [date, setDate] = useState(new Date());
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { theme, allTasks, closeModal } = useGlobalState();

  const onDateChange = (d: any) => {
    setDate(d);
    setShowCreateForm(true)
    console.log('d', d)
  }

  return showCreateForm ? <CreateContent dateP={date} /> : (
    <CalendarModalStyled theme={theme} className="flex flex-col items-center justify-center">
        <h1>Pick a date</h1>
        <DatePicker selected={date} onChange={onDateChange} inline showMonthDropdown showYearDropdown />
    </CalendarModalStyled>
  );
}

const CalendarModalStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
    margin-bottom: 15px;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CalendarModal;
