import { useNavigate } from "react-router-dom";

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <aside className="ml-10 transition-all duration-300 absolute px-3 py-2 bg-blue-500 rounded-4xl mt-3 hover:bg-red-500 items-center justify-center">
      <button type="button" onClick={() => navigate(-1)}>
        {" "}
        ❮-{" "}
      </button>
    </aside>
  );
};
