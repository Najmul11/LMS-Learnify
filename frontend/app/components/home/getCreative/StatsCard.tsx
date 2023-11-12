import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

const data = [
  {
    tag: "CLASSES",
    num: "1K+",
  },
  {
    tag: "MEMBERS",
    num: "50K+",
  },

  {
    tag: "TEACHERS",
    num: "100+",
  },
  {
    tag: "APP STORE RATING",
    num: 4.8,
  },
];

const StatsCard = () => {
  return (
    <div className=" mx-auto py-10 1000px:mt-10">
      <div className="grid grid-cols-2 800px:grid-cols-4 gap-x-5 1000px:gap-x-10 gap-y-5">
        {data.map((d, i) => (
          <div key={i} className={`bg-[#003A55] p-1 py-4 rounded-md`}>
            <div className="flex justify-center flex-col items-center gap-3">
              <span
                className="font-[700] text-3xl text-[#37a39a] flex items-center
               gap-x-1"
              >
                {d.num} {i === 3 ? <StarRateRoundedIcon /> : ""}
              </span>
              <p className="text-white font-[500]">{d.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
