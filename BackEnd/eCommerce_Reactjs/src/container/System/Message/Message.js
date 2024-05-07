import React from 'react';
import { useEffect, useState ,useRef} from 'react';
import { useFetchAllcode } from '../../customize/fetch';
import {  listRoomOfAdmin} from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import MessageDisscution from '../../Message/MessageDisscution';
import ChatWindow from '../../Message/ChatWindow';
import socketIOClient from "socket.io-client";
require('dotenv').config();
const Message = () => {
  const [dataUser, setdataUser] = useState({})
    const [dataRoom, setdataRoom] = useState([])
  const [selectedRoom, setselectedRoom] = useState('')
  const host = process.env.REACT_APP_BACKEND_URL;
  const socketRef = useRef();
  const [id, setId] = useState();
  useEffect(()=>{
    socketRef.current = socketIOClient.connect(host)
    const userData = JSON.parse(localStorage.getItem('userData'));
    setdataUser(userData)
    socketRef.current.on('getId', data => {
      setId(data)
    }) // phần này đơn giản để gán id cho mỗi phiên kết nối vào page. Mục đích chính là để phân biệt đoạn nào là của mình đang chat.
    fetchListRoom()
    socketRef.current.on('sendDataServer', dataGot => {
      fetchListRoom()
      }) 
      socketRef.current.on('loadRoomServer', dataGot => {
        fetchListRoom(userData.id)
        })  
      return () => {
        socketRef.current.disconnect();
      };
  },[])
 let handleClickRoom = (roomId)=>{
    socketRef.current.emit('loadRoomClient')
    setselectedRoom(roomId)
   
 }
 let fetchListRoom = async() =>{
  let res = await listRoomOfAdmin()
  if(res && res.errCode==0){
    setdataRoom(res.data)
  }
}
    return (
        <div className="container">
        <div className="ks-page-content">
          <div className="ks-page-content-body">
            <div className="ks-messenger">
                 <MessageDisscution userId={dataUser.id} isAdmin={true} handleClickRoom={handleClickRoom} data={dataRoom}/>
                 {selectedRoom ? <ChatWindow userId={dataUser.id} roomId={selectedRoom}  />
                 :<div>
                    <span className='title'>Chưa chọn phòng</span>
                 </div> 
                }
                
             
            </div>
          </div>
        </div>
      </div>
    )
}
export default Message;