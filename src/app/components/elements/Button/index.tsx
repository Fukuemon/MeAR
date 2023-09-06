import React, { FC } from "react";
type Props = {
  children: React.ReactNode;
  onSubmit: () => void;
  className: string;
};

const Button: FC<Props> = (props) => {
  return (
    <div>
      <button onSubmit={props.onSubmit} className={props.className}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
