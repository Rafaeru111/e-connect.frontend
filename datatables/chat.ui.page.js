import React, { useState, useEffect } from 'react';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { getMyProfile, getUsers, sendingMessage, getChat } from '../api/global.api'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  ConversationList,
  Conversation,
  ConversationHeader,

} from "@chatscope/chat-ui-kit-react";

import utils from "../helpers/utils";
import { 
    Card, 
    Typography,
    Divider,
    Input  } from "antd";
    const { Title } = Typography;
    import { AudioOutlined } from '@ant-design/icons';
    const { Search } = Input;
  

  import { io } from "socket.io-client";
  //const URL = 'ws://localhost:8000';
  const URL = 'https://econnect-io.mjc-econnect.com/';
  import Swal from 'sweetalert2'
  import { useRouter } from 'next/router';
const ChatUiPage = () => {
  const router = useRouter();

  const [chatting_user, setChatting_user] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [getroom, setRoom] = useState("");
  const [getNameChat, setGetNameChat] = useState("");
  const [roomId, setRoomId]  = useState("");
  const [user, setUser] = useState({});
  const [getsenderName, setSenderName] = useState("");
  let isEventListenerRegistered = false;

  const socket = io(URL);

  const fetchUserProfile = async () => {

    
    try {
      const response = await getMyProfile();
      const data = await response.data;
    	const fullname = `${data.firstName} ${data.lastName} (${data.role})`
      setUser(data);
      setSenderName(fullname)
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

 const getusers = async () => {
    try {
      const response = await getUsers();
      const data = await response.data;
      setChatting_user(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
 
  const send = async (message, reciever) => {
    try {
      const response = await sendingMessage(message, reciever);
      if(response.status === 200){
        console.log("OKs success")
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  
  const gettingChat = async (reciever) => {
    try {
      const response = await getChat(reciever);
      if(response.status === 200){
        setConversation(response.data)
   
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    getusers();
  }, []); 
  
     const joinRoom = (room, name) => {
      if(!roomId){
        Swal.fire({
          title: "Are you sure you want to Open Message?",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, open it!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {

            const roomId = room
            socket.emit('joinRoom', roomId);

            setRoomId(roomId);
            setGetNameChat(name)
            gettingChat(roomId)
          }
        });
      }else{
        Swal.fire({
          title: "You need to Leave the Room",
          text: "Do you want to Leave the Room?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Leave Room",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            router.reload()
            //  socket.emit('forceDisconnect');
            //  setConversation([])
            //setRoomId("");
            //setGetNameChat("")
          }
        });
      }
  };

//   // Function to handle sending the message
  const sendMessage =  (value) => {
    
   send(value, roomId) 

    const date = new Date();
    const dateformat = utils.convertDate(date)

    console.log(conversation)
     
        const values = {
          message: value,
          sender_name: getsenderName,
          sender: user._id,
          date:dateformat
        };
   
    socket.emit('sendMessage', {roomId, values });

    setMessageInputValue("")
};


socket.on("convo", (data) => {
  const sender = data.sender;
  const newMessage = {
      props: {
          direction: sender === user._id ? 'outgoing' : 'incoming',
          message: data.message,
          position: 'single',
          sender: sender,
      },
      header:{
        sender:data.sender_name,
      },
      footer: {
          sentTime: data.date
      }
  };

  const exists = conversation.some(msg => {
      const sameContent = msg.props.message === newMessage.props.message;
      const sameSender = msg.props.sender === newMessage.props.sender;
      const sameTime = msg.footer.sentTime === newMessage.footer.sentTime;
      return sameContent && sameSender && sameTime;
  });

  if (!exists) {
      // Add the new message to the conversation array
      setConversation((conversation) => [...conversation, newMessage]);
  }
});

const [searchTerm, setSearchTerm] = useState('');
   
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
      const filteredUsers = chatting_user.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
  return (
    <>
    <Card bordered={true} style={{borderRadius: 0}}>
          <Divider orientation="left">
            <Title level={3} >
              CHAT SUPPORT - Admin Name: {user.firstName}  {user.lastName}
            </Title>
          </Divider>
       
        </Card>
    <MainContainer
    responsive
    style={{
      height: '600px',
      overflow:'none',
      padding:'20px'
    }}
  >
    <Sidebar position="left">
      
          
            <Search
              placeholder="input search text"
              allowClear
              value={searchTerm}
              style={{
                padding: 5,
              }}
              onChange={(val) => handleSearchChange(val)} 
            />
            
            <ConversationList>
                {filteredUsers.map(user => (
                    <Conversation
                        key={user._id}
                        info={user.info}
                        lastSenderName={user.lastSenderName}
                        name={user.name}
                        onClick={() => joinRoom(user._id, user.name)}
                    />
                ))}
            </ConversationList>
        </Sidebar>
    <ChatContainer>
        
      <ConversationHeader>
        <ConversationHeader.Back />
        <ConversationHeader.Content
          info="Message"
          userName={getNameChat}
        />
        <ConversationHeader.Actions>
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList>

      {conversation.map((conv, index) => (
        
            <Message key={index} model={conv.props}>
               <Message.Header sender={conv.header.sender}/>
                <Message.Footer sentTime={conv.footer.sentTime} />
            </Message>
        ))}

      </MessageList>
      <MessageInput 
           placeholder="Type message here"
           value={messageInputValue}
           onChange={(val) => setMessageInputValue(val)}
           onSend={(innerHtml, text) => sendMessage(text)}
           attachButton={false}
        />

    </ChatContainer>
  </MainContainer>
    </>
  )
}

export default ChatUiPage