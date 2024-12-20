export default function Loader() {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-40 flex flex-col justify-center items-center z-50 space-y-4">
      <div className="relative w-16 h-16" style={{ marginTop: "-20px" }}>
        <div
          className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"
          style={{
            animationDuration: "0.6s",
          }}
        ></div>
      </div>
      <p className="text-gray-200 text-lg font-medium font-mullish">
        Please wait...
      </p>
    </div>
  );
}
