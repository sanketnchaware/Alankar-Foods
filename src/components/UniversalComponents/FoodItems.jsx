import "../Dashboard/dashboard.scss";

export const FoodItems = ({ data }) => {
  return (
    <div className="w-28 grid grid-flow-row place-items-center bg-white box rounded-xl">
      <div className="w-12 h-12 lg:w-16 lg:h-16 bgColor rounded-[31px] mt-4 grid place-items-center">
        <img
          className=" w-8 h-8 object-contain"
          src={data.picture}
          alt="img"
        />
      </div>
      <p className=" font-semibold text-2xl">{data.count}</p>
      <p className=" font-semibold text-xs mb-4">{data.type}</p>
    </div>
  );
};
