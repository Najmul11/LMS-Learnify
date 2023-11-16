import StatsCard from "./StatsCard";
import Tickers from "./Tickers";
const GetCreative = () => {
  return (
    <div className="1000px:pb-20">
      <div className="w-[90%] 1000px:w-[80%] 1200px:w-[70%] 1500px:w-[60%]  mx-auto  ">
        <Tickers />
        <StatsCard />
      </div>
    </div>
  );
};

export default GetCreative;
