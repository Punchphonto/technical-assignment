
import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import profile from "../../assets/profile.png"
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";



const PotentialChat = () => {
    const { user } = useContext(AuthContext)
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
    return <>
        <div className="all-users">
            {potentialChats && potentialChats.map((u, index) => {
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