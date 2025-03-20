import { useNavigate } from "react-router";

export function BackButton() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <button
      onClick={goBack}
      className="border-[1px] border-white/15 px-4 py-2 rounded-xl cursor-pointer"
    >
      👈🏽 Back
    </button>
  );
}
