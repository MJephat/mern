// import { useEffect, useRef } from "react";
// import useGetMessages from "../../hooks/useGetMessages";
// import MessageSkeleton from "../skeleton/messageSkeleton";
// import Message from "./Message";
// import useListenMessages from "../../hooks/useListenMessages";

// const Messages = () => {
// 	const {messages, loading} = useGetMessages();
// 	// console.log("messages", messages)
// 	useListenMessages();
// 	//autoscroll messages
// 	const lastMessageRef = useRef();

// 	useEffect(()=>{
// 		setTimeout(()=>{
// 			lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
// 		},50);
// 	},[messages])

// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			{!loading && messages.length > 0 &&
// 			messages.map((message) =>(
// 			<div key={message._id} ref={lastMessageRef}>
// 				<Message message={message} />

// 			</div>
// 			))}


// 			{loading && [...Array(3)].map((_, idx)=><MessageSkeleton key={idx} />)}
// 			{!loading && messages.length === 0 && (<p className='text-center'>
// 				Select a Chat to Reply</p>)}
// 		</div>
// 	);
// };
// export default Messages;

import React, { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/messageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  // console.log("messages", messages)
  useListenMessages();
  //autoscroll messages
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Select a Chat to Reply</p>
      )}
    </div>
  );
};
export default Messages;

