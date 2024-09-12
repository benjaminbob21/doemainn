import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 text-5xl font-bold tracking-tighter text-blue-600">
      <TypeAnimation
        sequence={[
          "Quality Matters!", // Types 'Hello'
          3000, // Waits 1s
          "Protecting your water,", // Deletes 'Hello' and types 'Hello world!'
          900, // Waits 2s
          "Protecting you!",
          1500,
          "Committed to purity💧",
          3000,
        ]}
        wrapper="span"
        cursor={false}
        repeat={Infinity}
      />
      {/* <div className="text-5xl font-bold tracking-tight text-blue-600">
        Quality Matters
      </div> */}
    </div>
  );
};

export default Banner;
