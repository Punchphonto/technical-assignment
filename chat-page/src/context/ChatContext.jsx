import React, { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, posRequest, getRequest } from "../utils/services";
import { io } from "socket.io-client"

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [snedTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);


    useEffect(() => {
        const newSocket = io("localhost:3000")
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        }
    }, [user])

    // to get online user
    useEffect(() => {
        if (!socket && !user) {
            return;
        }
        socket.emit("addNewUser", user?._id)
        socket.on("getOnlineUser", (res) => {
            setOnlineUsers(res)
        })

        return () => {
            socket.off("getOnlineUser")
        }
    }, [socket]);


    // sned msg 
    useEffect(() => {
        if (!socket) {
            return;
        }
        const recipientId = currentChat?.members.find((id) => id !== user?._id)
        console.log(newMessage);
        socket.emit("sendMessage", { ...newMessage, recipientId })

    }, [newMessage]);


    // receive msg
    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.on("getMessage", res => {
            if (currentChat?._id !== res.chatId) {
                return
            }
            setMessages((prev) => [...prev, res])
        })

        return () => {
            socket.off("getMessage")
        }

    }, [socket, currentChat]);



    useEffect(() => {
        const getUsers = async () => {

            const response = await getRequest(`${baseUrl}/users/get_users`);
            if (response.error) {
                return console.log(("Error fetching users", response));
            }

            const pChat = response.filter((u) => {
                let isChatCreated = false

                if (user?._id === u.id) {
                    return false
                }

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }

                return !isChatCreated
            })

            setPotentialChats(pChat)
        }

        getUsers();

    }, [userChats])


    useEffect(() => {
        const getUserChat = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true)
                setUserChatsError(null)
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)

                if (response.error) {
                    return setUserChatsError(response)
                }
                setIsUserChatsLoading(false)
                setUserChats(response);
            }
        }

        getUserChat();
    }, [user]);


    useEffect(() => {
        const getMessages = async () => {

            setIsMessagesLoading(true)
            setMessagesError(null)
            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)

            if (response.error) {
                return setMessagesError(response)
            }
            setIsMessagesLoading(false)
            setMessages(response);
        }

        getMessages();
    }, [currentChat]);


    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) {
            return;
        }
        const response = await posRequest(`${baseUrl}/messages`, JSON.stringify(
            {
                chatId: currentChatId,
                senderId: sender._id,
                text: textMessage
            })
        );

        if (response.error) {
            return setSendTextMessageError(response.error)
        }

        setNewMessage(response)
        setMessages((prev) => [...prev, response])
        setTextMessage("")

    }, [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])


    const createChat = useCallback(async (firstId, secondId) => {
        const response = await posRequest(`${baseUrl}/chats`, JSON.stringify({
            firstId,
            secondId,
        }))

        if (response.error) {
            return console.log(("Error creating chat", response));
        }

        setUserChats((prev) => [...prev, response]);
    }, [])


    return <ChatContext.Provider
        value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            currentChat,
            updateCurrentChat,
            messages,
            isMessagesLoading,
            messagesError,
            sendTextMessage,
            onlineUsers,
        }}
    >
        {children}
    </ChatContext.Provider>
}