import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StartRating = ({ ratings, length }: any) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((a, i) => (
          <div key={i} className="text-yellow-400">
            {length === 0 ? (
              <AiOutlineStar className="text-[20.5px] " />
            ) : (
              <div>
                {ratings >= i + 1 ? (
                  <FaStar />
                ) : (
                  <AiOutlineStar className="text-[20.5px]" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartRating;
