import alankar from "../../Images/alankar.svg";
import login_img from "../../Images/login1.svg";

import "./login.scss";

export const ForgotPassword = () => {
  const handleSubmit = () => {
    console.log("form submitted");
  };
  return (
    <div className=" bg-background max-w-[1920px] mx-auto h-screen overflow-hidden">
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
          <h2 className="font-sans text-5xl  max-w-[500px] text-darkyellow font-semibold 2xl:max-w-[615px] ">
            Forgot <span className="block"> password ?</span>
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-flow-row bg-white rounded-xl mt-11 boxShadow max-w-[500px] 2xl:max-w-[619px] 2xl:mt-18"
          >
            <label className="block text-lg text-darkyellow font-semibold pl-14 mt-8 2xl:pl-12 2xl:mt-13 lowercase">
              Your Email Address
            </label>
            <input
              className="w-[420px] h-[55px] border border-darkyellow rounded-xl mt-3  place-self-center outline-none pl-3 text-darkyellow bg-search 2xl:w-[525px] 2xl:h-17 lowercase"
              type="email"
            />

            <button className="w-[415px] h-[50px] radient rounded-xl mt-8 mb-13  text-xl font-semibold text-white place-self-center 2xl:w-[516px] 2xl:h-14 2xl:mt-13 2xl:mb-16 ">
              VERIFY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
