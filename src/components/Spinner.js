import spinner from "../assests/svg/spinner.svg";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0">
      <div>
        <img src={spinner} alt="Loading..." className="h-24" />
      </div>
    </div>
  );
};

export default Spinner;
