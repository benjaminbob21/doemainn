const Footer = () => {
  return (
    <div className="bg-blue-600 text-white py-3">
      <div className="container mx-auto flex justify-between ">
        <span className="font-bold text-3xl tracking-tighter">
          AquaTrack.com&copy;
        </span>
        <span className="flex gap-4 font-bold tracking-tight">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
