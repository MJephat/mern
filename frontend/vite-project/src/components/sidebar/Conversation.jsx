import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({conversation,lastIdx,emoji}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  // Initialize the state from localStorage or default to false
  const [isChecked, setIsChecked] = useState(() => {
    const saved = localStorage.getItem(`checkboxState-${conversation._id}`);
    return saved === "true";
  });

  // Update localStorage whenever the checkbox state changes
  useEffect(() => {
    localStorage.setItem(`checkboxState-${conversation._id}`, isChecked);
  }, [isChecked, conversation._id]);

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
	  	${isSelected ? "bg-sky-400" : ""}
		`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.username}</p>
            <label className="swap">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <div className={`swap-on ${isChecked ? "text-green-700" : ""}`}>
                <strong>Done &#x2713;</strong>
              </div>
              <div className={`swap-off ${!isChecked ? "text-red-600" : ""}`}>
                <strong>urgent !</strong>
              </div>
            </label>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
