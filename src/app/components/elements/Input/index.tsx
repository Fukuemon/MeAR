import React, { FC } from "react";

type Props = {
  text: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
};

const Input: FC<Props> = (props) => {
  return (
    <div className="relative container">
      <div className="absolute top-0 left-2 flex items-center h-full ml-2">
        <div className="w-4 h-4 text-gray-500 dark:text-gray-400">
          {props.icon}
        </div>
      </div>

      <input
        type="text"
        value={props.text}
        onChange={props.handleInput}
        placeholder={props.placeholder}
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default Input;
