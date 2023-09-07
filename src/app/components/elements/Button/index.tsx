import React, { FC } from "react";
type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
};

const Button: FC<Props> = (props) => {
  return (
    <div>
      <button onClick={props.onClick} className={props.className}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
