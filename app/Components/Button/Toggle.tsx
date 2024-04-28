"use client";
import { useGlobalState } from "@/app/context/globalProvider";

import React, { useState } from "react";
import styled from "styled-components";
import { arrowLeft, bars, logout, sun, moon } from "@/app/utils/Icons";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  border?: string;
  color?: string;
}

function Toggle(
//     {
//   icon,
//   name,
//   background,
//   padding,
//   borderRad,
//   fw,
//   fs,
//   click,
//   type,
//   border,
//   color,
// }: Props
) {
  const { theme, toggleTheme, selectedTheme } = useGlobalState();

   const [isToggled, setIsToggled] = useState(false);

  const onToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <ButtonStyled
        style={{ 
            "padding": "0.4rem 0.8rem",
            "marginBottom": "1rem"
         }}
    >
        <input type="checkbox" className="checkbox" id="chk" checked={selectedTheme} onChange={toggleTheme} />
        <label className="label" onClick={() => toggleTheme()}>
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <div className="ball"></div>
        </label>
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
    .checkbox {
        opacity: 0;
        position: absolute;
    }

    .label {
        background-color: #111;
        border-radius: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        position: relative;
        height: 26px;
        width: 50px;
        transform: scale(1.5);
    }

    .label .ball {
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: 2px;
        height: 22px;
        width: 22px;
        transform: translateX(0px);
        transition: transform 0.2s linear;
    }

    .checkbox:checked + .label .ball {
        transform: translateX(24px);
    }


    .fa-moon {
        color: #f1c40f;
    }

    .fa-sun {
        color: #f39c12;
    }
`;

export default Toggle;
