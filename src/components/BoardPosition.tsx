import React from "react";

interface BoardPositionProps {
  id: string;
  player: number;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const BoardPosition: React.FC<BoardPositionProps> = ({
  player,
  id,
  handleClick,
}) => {
  return (
    <div
      id={id}
      onClick={handleClick}
      className="h-full border border-gray-500 cursor-pointer text-3xl flex-1 flex items-center justify-center mb-0.5"
    >
      {player === 1 && <div className="text-red-500">O</div>}
      {player === -1 && <div className="text-lime-600">X</div>}
    </div>
  );
};

export default BoardPosition;
