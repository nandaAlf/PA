import { ScaleLoader } from "react-spinners";

function Loader() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center bg-[#f5f9faff] bg-opacity-50 z-100">
    
      <ScaleLoader color="#89BEC5" />
    </div>
  );
}

export default Loader;
