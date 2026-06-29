import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <aside className="ml-10 transition-all duration-300 absolute  mt-3 px-3 py-2 bg-blue-950 rounded-4xl hover:bg-red-500 items-center justify-center text-white">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="items-center flex justify-center "
      >
        <IoMdArrowBack />
      </button>
    </aside>
  );
};
