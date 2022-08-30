import alankar from "../../Images/alankar.svg";
import login_img from "../../Images/login1.svg";

import "./login.scss";

export const ResetPassword = () => {
  const handleSubmit = () => {
    console.log("form submitted");
  };
  return (
    <div className=" bg-background max-w-[1920px] mx-auto h-screen">
      {/* Alankar Logo */}
      <div className=" ml-24 pt-9 mb-16 2xl:ml-40 2xl:pt-20 2xl:mb-24">
        <img
          className="w-[220px] h-16 2xl:w-[326px] 2xl:h-18"
          src={alankar}
          alt="alankar"
        />
      </div>

      {/* Side Image */}
      <div className="grid grid-flow-col">
        <div>
          <img
            className="w-[700px] h-[500px] 2xl:w-[843px] 2xl:h-[685px]"
            src={login_img}
            alt="login"
          />
        </div>
        <div className="relative bottom-[72px] 2xl:bottom-24">
          <h2 className=" font-sans text-darkyellow font-semibold text-4xl tracking-wide max-w-[500px] 2xl:max-w-[615px] ">
            Reset Password
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-flow-row bg-white rounded-xl mt-11 boxShadow max-w-[500px] 2xl:max-w-[619px] 2xl:mt-18"
          >
            <label className="block text-lg text-darkyellow font-semibold pl-11 mt-5 2xl:pl-12 2xl:mt-13">
              New Password
            </label>
            <input
              className="w-[420px] h-[55px] border border-darkyellow rounded-xl mt-3 mb-6 place-self-center bg-search outline-none pl-3 2xl:w-[525px] 2xl:h-17 "
              type="password"
            />

            <label className=" block text-lg text-darkyellow font-semibold pl-11 2xl:pl-12">
              Re-enter New Password
            </label>
            <input
              className="w-[420px] h-[55px] border border-darkyellow rounded-xl mt-3 mb-6 place-self-center bg-search outline-none pl-3 2xl:h-17 2xl:w-[525px]"
              type="password"
            />
            <button className="w-[415px] h-[50px] radient rounded-xl mt-8 mb-8  text-xl font-semibold  text-white place-self-center 2xl:w-[516px] 2xl:h-14 2xl:mt-13 2xl:mb-16 ">
              RESET
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
