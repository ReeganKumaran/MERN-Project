
const theme = {
  secondary: "#f0f0f0",
  btn: "#007bff"
};

const PlusBtn = ({ isOpen, setIsOpen }) => {
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      style={{ backgroundColor: theme.secondary }}
      onClick={handleClick}
      className="hidden md:flex lg:flex xl:flex 2xl:flex fixed bottom-[50px] right-[50px] w-14 h-14 rounded-full hover:bg-blue-700 flex items-center justify-center shadow-md transition duration-200 z-50"
    >
      <div
        className={`relative w-6 h-6 transition-transform duration-300 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        {/* Horizontal Line */}
        <span
          style={{ backgroundColor: theme.btn }}
          className="absolute top-1/2 left-0 w-full h-[3px] bg-white transform -translate-y-1/2"
        />
        {/* Vertical Line */}
        <span
          style={{ backgroundColor: theme.btn }}
          className="absolute left-1/2 top-0 h-full w-[3px] bg-white transform -translate-x-1/2"
        />
      </div>
    </button>
  );
};

export default PlusBtn;
