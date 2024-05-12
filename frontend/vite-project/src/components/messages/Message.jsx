// import React from 'react'
// import {useAuthContext} from '../../context/AuthContext';
// import useConversation from '../../zustand/useConversation';
// import { extractTime } from '../../utils/extractTime';

// const Message = ({message}) => {
//   const {authUser} = useAuthContext();
//   const {selectedConversation} = useConversation();
//   const formatedTime= extractTime(message.createdAt);
//   const fromMe = message.senderId === authUser._id;
//   const chatClassName = fromMe ? 'chat-end' : 'chat-start';
//   const profilePIC = fromMe ? authUser.profilePIC : selectedConversation?.profilePic;
//   const bubbleBgcolor = fromMe ? "bg-green-400" : "bg-sky-400";

//   const shakeClass = message.shouldShake ? "shake" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img
//             alt="pd"
//             src={
//               "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
//             }
//           />
//         </div>
//       </div>
//       <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgcolor} ${shakeClass} pb-2`}>
//         {message.message}
//       </div>
//       <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
//         {formatedTime}
//       </div>
//     </div>
//   );
// }

// export default Message

import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt);
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePIC = fromMe
    ? authUser.profilePIC
    : selectedConversation?.profilePic;
  const bubbleBgcolor = fromMe ? "bg-green-400" : "bg-sky-400";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Profile"
            src={
              profilePIC
                ? profilePIC
                : "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            }
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white bg-blue-500 ${bubbleBgcolor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
