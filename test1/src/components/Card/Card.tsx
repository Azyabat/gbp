import { FC } from "react";
import { DataDTO } from "../App";
import "./Card.css";

type CardProps = DataDTO;

export const Card: FC<CardProps> = ({ header, options, text }) => {
  return (
    <div className="wrapper-card">
      <h4>{header}</h4>
      <ul>
        {options.map((option, index) => (
          <li key={`li-${option.length}-${index}`}>{option}</li>
        ))}
      </ul>
      <p>{text}</p>
    </div>
  );
};
