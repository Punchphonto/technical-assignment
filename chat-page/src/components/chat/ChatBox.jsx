
import { useContext, useState } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import profile from "../../assets/profile.png"
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import InputEmoji from "react-input-emoji"



const ChatBox = () => {
    const { user } = useContext(AuthContext)
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user)
    const [textMessage, setTextMessage] = useState("");

    if (!recipientUser) {
        return (
            <p style={{ textAlign: "center", width: "100%" }}>
                No conversation selected
            </p>
        )
    }


    if (isMessagesLoading) {
        return (
            <p style={{ textAlign: "center", width: "100%" }}>
                Loading Chat
            </p>
        )
    }
    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <h3 className="text-blod">{recipientUser?.name}</h3>
            </div>
            <Stack className="messages" gap={3}>
                {messages &&
                    messages.map((message, index) =>
                        <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}>
                            <span>{message.text}</span>
                            <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                        </Stack>
                    )}
            </Stack>
            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <InputEmoji
                    value={textMessage}
                    onChange={setTextMessage}
                    borderColor="#2874A6"
                />
                <button className="send-btn" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
                    send
                </button>
            </Stack>

        </Stack>
    )
}

export default ChatBox