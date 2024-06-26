
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";



const PotentialChat = () => {
    const { user } = useContext(AuthContext)
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
    return <>
        <div className="all-users">
            {potentialChats && potentialChats.map((u, index) => {
                if (user._id === u._id) return;

                return (
                    <div className="single-user" key={index} onClick={() => createChat(user._id, u._id)}>
                        {u.name}
                        <span className={
                            onlineUsers?.some((user) => user?.userId === u?._id) ? "user-online" : ""}></span>
                    </div>
                );

            })}
        </div>
    </>
}

export default PotentialChat