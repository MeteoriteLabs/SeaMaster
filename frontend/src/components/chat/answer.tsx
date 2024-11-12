"use client"

export function Answer(props: any) {
    return (
        <>
            <div key={props.key} className="flex justify-end mb-4 cursor-pointer">
                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                    <p>{props.message}</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                    <img src="sea_master_chat_icon.svg" alt="Sea Master Avatar" className="w-8 h-8 rounded-full" />
                </div>
            </div>
        </>
    )
}