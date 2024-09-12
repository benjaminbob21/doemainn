import waterhero from "./ui/waterhero.jpeg";

const Whero = () => {
  return (
    <div>
      <img
        src={waterhero}
        alt="water"
        className="w-full max-h-[800px] object-cover"
      />
    </div>
  );
};

export default Whero;
