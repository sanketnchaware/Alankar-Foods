import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import React from "react";
import axios from 'axios'

export const FeedbackCard = (props) => {
 
  useEffect(() => {
    getDataT();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const token = localStorage.getItem("alankartoken");
  
  const getDataT = async () =>{
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/reports/feedbacks/stats`,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    })
    // setdata(data.data)
    console.log(data.data,"res")
  }


  useEffect(() => {
    getData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const getData = async () =>{
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/reports/feedbacks/stats`,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    })
  
   console.log(data?.data[0]?.feedbackcount.toFixed(1));

  }

  console.log(props.data1,"rating data");
 
const getStars = (rating) => {
  let arr = [<StarIcon/>,<StarIcon/>,<StarIcon/>,<StarIcon/>,<StarIcon/>]
  arr.fill(<StarIcon className=" text-yellowstar"/>,0,rating)
  return arr
}

  return (
    <div className=" flex flex-col gap-8 w-3/12 rounded-lg  shadow-xl bg-white text-center justify-center py-4 xl:w-2/12">
      <p className=" text-xl font-semibold">{props.data}</p>
      <div className=" ml-[25%]">
      <div className="">
      <PieChart
        data={[
          { value: Math.floor(props.data1), color: "url(#gradient1)" },
          { value: Math.floor(props.data1), color: "#F0912C59" },
        ]}
        totalValue={5}
        viewBoxSize={[200, 100]}
        startAngle={200}
        center={[75, 50]}
        lineWidth={22}
        paddingAngle={4}
        rounded={false}
        label={({ dataEntry }) => {
          if (dataEntry.value > 0) return dataEntry.value;
        }}
        labelStyle={{
          fontSize: "25px",
          fontFamily: "sans-serif",
          fill: "#E38627",
        }}
        labelPosition={0}
        lengthAngle={-360}
        animate
      >
        <defs>
          <linearGradient id="gradient1">
            <stop offset="0%" stopColor="#FFBE15" />
            <stop offset="45%" stopColor="#FFBE15" />
            <stop offset="55%" stopColor="#F38B1CCC" />
            <stop offset="100%" stopColor="#F38B1CCC" />
          </linearGradient>
        </defs>
      </PieChart>
    </div>
      </div>
      <p className=" text-sm font-semibold "> {Math.floor(props.data1)} Ratings</p>
      <div className="flex gap-[2px] justify-center">
         {getStars(props.data1)}
      </div>
    </div>
  );
};
