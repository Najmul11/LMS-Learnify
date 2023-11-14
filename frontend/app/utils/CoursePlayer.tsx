import axios from "axios";
import React, { FC, useEffect, useState, useCallback } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  const [api, setApi] = useState(false);

  // const fetchData = useCallback(() => {
  //   axios
  //     .post(`http://localhost:5001/api/v1/courses/get-vdocipherOTP`, {
  //       videoId: videoUrl,
  //     })
  //     .then((res) => {
  //       setApi(true);
  //       setVideoData(res.data);
  //     })
  //     .catch((error) => {
  //       setTimeout(fetchData, 1000);
  //     });
  // }, [videoUrl]);

  // useEffect(() => {
  //   if (!api) {
  //     fetchData();
  //   }
  // }, [fetchData, api]);

  useEffect(() => {
    if (!api) {
      axios
        .post(`http://localhost:5001/api/v1/courses/get-vdocipherOTP`, {
          videoId: videoUrl,
        })
        .then((res) => {
          setApi(true);

          setVideoData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [videoUrl, videoData, api]);

  return (
    <div
      style={{ paddingTop: "41%", position: "relative" }}
      className="w-[90%] "
    >
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=N7Hx3Od3DLpqvwfm`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
