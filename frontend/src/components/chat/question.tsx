"use client";

export function Question(props: { message: string; timestamp: string }) {
  return (
    <div className="flex mb-4 items-start">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3 border-gray-300">
        <img
          src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
          alt="User Avatar"
          className="w-9 h-9 rounded-full"
        />
      </div>

      {/* Message Bubble */}
      <div className="flex flex-col max-w-lg bg-[#E9F5FF] px-4 py-2 rounded-2xl rounded-tl-none shadow">
        <p className="text-sm text-gray-800 leading-relaxed">{props.message}</p>
        <span className="text-xs text-gray-500 text-left">
          {props.timestamp}
        </span>
      </div>
    </div>
  );
}
