import { FC } from "react";

// 店舗情報を表示するプレゼンテーショナルコンポーネント
type PresentationProps = {
  readonly shop: {
    readonly id: number;
    readonly name: string;
  };
  readonly onClick: () => void;
};

const ShopItemPresenter: FC<PresentationProps> = ({
  shop: { id, name },
  onClick,
}) => {
  return (
    <div key={id} onClick={onClick} className="cursor-pointer">
      <h2 className="text-lg py-2 font-bold">{name}</h2>
    </div>
  );
};

export default ShopItemPresenter;
