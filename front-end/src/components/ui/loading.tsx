import React from 'react'

function Loading() {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="relative w-72 h-1 overflow-hidden rounded-full bg-neutral-800">
        <div className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-white animate-loadingBar" />
      </div>
    </div>
  )
}

export default Loading