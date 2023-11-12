import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const tickers = [
  "Learn creative skills to achieve your personal and professional goals.",
  "Tune in and level up at your own pace.",
  "Go from dabbler to master in a matter of hours.",
  "Connect with a global community of curious creatives.",
];

const Tickers = () => {
  return (
    <div className="flex flex-col 1000px:flex-row py-10 items-center gap-y-5">
      <div className="w-full 1000px:w-1/2">
        <h2 className="text-3xl font-[700] text-center font-Poppins 1000px:hidden dark:text-white">
          Get Creative With <br className="800px:hidden" /> Learnify
        </h2>
        <div className="hidden 1000px:flex flex-col text-[40px] text-black dark:text-white font-[700] font-Poppins ">
          <span className="font-Poppins"> Get Creative</span>
          <span> With</span>
          <span>Learnify</span>
        </div>
      </div>
      <div className="w-full 1000px:w-1/2 flex flex-col gap-5">
        {tickers.map((tick, i) => (
          <div
            key={i}
            className="flex gap-5  800px:w-[80%] 800px:mx-auto 1000px:w-full"
          >
            <CheckCircleRoundedIcon
              sx={{
                color: "#37a39a",
                mt: "2px",
              }}
            />
            <p className="text-black dark:text-white text-xl  font-[500]  ">
              {tick}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickers;
