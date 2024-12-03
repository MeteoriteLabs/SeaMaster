"use client";

export function Answer(props: { message: string; timestamp: string }) {
  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      {/* Message Bubble */}
      <div className="flex flex-col max-w-lg bg-[#F4F4F7] text-[#000000] rounded-2xl rounded-br-none px-4 pt-3 pb-2 gap-1 shadow">
        <p className="text-sm leading-relaxed">{props.message}</p>
        <span className="text-xs text-gray-500 mt-2 text-right">
          {props.timestamp}
        </span>
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <img
          src="sea_master_chat_icon.svg"
          alt="Sea Master Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
}
