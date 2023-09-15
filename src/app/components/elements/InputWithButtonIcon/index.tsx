import { Button, ButtonProps } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { FC, ReactNode, ChangeEvent, MouseEvent } from "react";

interface Props {
  inputProps: InputProps;
  buttonProps: ButtonProps;
  isButton?: boolean;
  icon?: ReactNode;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode; // children プロパティを追加
}

const InputWithButtonIcon: FC<Props> = ({
  inputProps,
  buttonProps,
  isButton = false,
  icon,
  handleInput,
  handleClick,
  children,
}) => {
  return (
    <div className="relative flex w-full max-w-sm items-center space-x-2 justify-center container">
      {/* インプット入力欄 */}
      <Input
        {...inputProps}
        type="text"
        className={`block w-full ${icon && "pl-10"}`}
        onChange={handleInput}
      />

      {/* アイコンが必要なら */}
      {icon && (
        <div className="absolute top-3 left-1 text-xl text-gray-500 dark:text-gray-400">
          {icon}
        </div>
      )}

      {isButton && (
        <Button
          type="submit"
          onClick={handleClick}
          className="w-24"
          {...buttonProps}
        >
          {children}
        </Button>
      )}
    </div>
  );
};

export default InputWithButtonIcon;
