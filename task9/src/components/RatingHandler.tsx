import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

type RatingProps = {
  rate: number;
  count: number;
};

export const RatingHandler = ({ rate, count }: RatingProps) => {
  return (
    <div className="flex items-center gap-1 text-sm ">
      <div className="flex text-yellow-500">
        {Array.from({ length: 5 }).map((_, index) => {
          const star = index + 1;
          if (rate >= star) return <IoStar key={index} />;
          if (rate >= star - 0.5) return <IoStarHalf key={index} />;

          return <IoStarOutline key={index} />;
        })}
      </div>
      <span className="text-xs text-gray-700">
        {rate} ({count})
      </span>
    </div>
  );
};
