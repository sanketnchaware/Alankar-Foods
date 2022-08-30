import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export const CurveLineChart = ({ report }) => {
  const widthSize = window.innerWidth;
  return (
    <AreaChart
      width={widthSize > 1024 ? 1000 : 630}
      height={351}
      data={report}
      margin={{ top: 20, right: 60, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorSale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#F0912C" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#F0912C" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="time" tick={{ fill: "#000000" }} padding={{ left: 73 }} />
      <YAxis tick={{ fill: "#000000" }} padding={{ bottom: 73 }} />
      <CartesianGrid strokeDasharray="3 3" horizontal="true" vertical="" />

      <Tooltip
        contentStyle={{ backgroundColor: "#F0912C", color: "#ffffff" }}
        itemStyle={{ color: "#ffffff" }}
        cursor={false}
      />
      <Area
        type="monotone"
        dataKey="total"
        fontSize={"10px"}
        stroke="#F0912C"
        fillOpacity={1}
        fill="url(#colorSale)"
        dot={{ fill: "#ffffff", stroke: "#F0912C", strokeWidth: 2, r: 5 }}
        activeDot={{
          fill: "#ffffff",
          stroke: "#F0912C",
          strokeWidth: 4,
          r: 9,
        }}
        strokeWidth="2"
      />
    </AreaChart>
  );
};


