import React, { useContext, useEffect } from "react"
import { ChatContext } from "../context/ChatContext"
import { Container, Stack, Row, Col } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChat from "../components/chat/PotentialChat";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
    const { user } = useContext(AuthContext)
    const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } = useContext(ChatContext)
    return <Container>
        <Container>
            <Row>
                <Col>
                    <PotentialChat></PotentialChat>
                </Col>
            </Row>
        </Container>
        {userChats?.lenght < 1 ? null : (
            <Container>
                <Row>
                    <Col lg="4" sm="12">
                        <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                            {isUserChatsLoading && <p>Loading ..</p>}
                            {userChats?.map((chat, index) => {
                                return (
                                    <div key={index} onClick={() => updateCurrentChat(chat)}>
                                        <UserChat chat={chat} user={user} />
                                    </div>
                                )
                            })}
                        </Stack>
                    </Col>
                    <Col lg="8" sm="12" className="gab-btween">
                        <ChatBox />
                    </Col>
                </Row>
            </Container>
        )}
    </Container >

}

export default Chat
