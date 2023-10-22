import React, { useEffect, useRef } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Chat () {
    const [search,setsearch] = useState("");
    const [search2,setsearch2] = useState("");
    const [chat,setChat] = useState([]);
    const [userData,setUserData] = useState([]);
    const [email,setEmail] = useState("");
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const [Role,setRole] = useState("");
    const [message,setMessage] = useState("");
    const [click,setClick] = useState(false);
    const [groupclick,setGroupClick] = useState(false);
    const [groupname,setGroupName] = useState("");
    const [groupusers,setGroupUsers] = useState(new Set());
    const [groupusers2,setGroupUsers2] = useState(new Set());
    const [groupChatClick, setGroupChatClick] = useState(false);
    const [groupChat,setGroupChat] = useState("");
    const [groupChatName, setGroupChatName] = useState("");
    const [groupUserData, setGroupUserData] = useState([]);
    const [groupModify, setGroupModify] = useState(false);
    const [groupChatId,setGroupChatId] = useState("");
    const [groupNameModify, setGroupNameModify] = useState("");
    const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
        if(cookies.jwt && (user.role=="Admin" || user.role=="Teacher" || user.role=="Parents" || user.role=="Student")){
            setChildData(user);
            setEmail(user.email);
            setRole(user.role);
            console.log(Role);
        navigate('/chat');
        }else{
            navigate('/login');
        }
    
    }

    const handleSearch = async() =>{        
        try{
            const { data } = await axios.get("http://localhost:8000/chat/alltheusers",
            {
                params:{
                    email:email,
                    role:Role,
                    search:search
                }
            },{withCredentials:true}
            );
            const { success, message, mergeData } = data;
            if(success){
                setMessage(message);
                setUserData(mergeData);
                navigate('/chat');
            }else{
                setMessage(message);
            }

        }catch(error){
            setMessage(error.message);
        }
    }

    const fetchChats = async() =>{
        try{
            const { data } = await axios.get("http://localhost:8000/chat",
            {
                params:{
                    email:email,
                }
            },{withCredentials:true}
            );
            const { success, message, fullmergeData } = data;
            if(success){
                setMessage(message);
                setChat(fullmergeData);
                navigate('/chat');
            }else{
                setMessage(message);
            }

        }catch(error){
            setMessage(error.message);
        }
    }

    const handleChange = (e) =>{
        // setsearch(e.target.value);
        setClick(!click);
        setGroupClick(false);
        e.preventDefault();
        if(click){
            handleSearch();
        }
    }

    const handleitem = async(e,id) =>{
        e.preventDefault();
        try{
            const { data } = await axios.post("http://localhost:8000/chat",
            {
                id,
                email
            },{withCredentials:true});
            const {success, message } = data;
            if(success){
                setMessage(message);
            }
        }catch(error){
            setMessage(error.message);
        }
    }

    const handleKeyChange = (e) =>{
        setsearch(e.target.value);
    }

    const handleGroupChange = (e) => {
        setGroupName(e.target.value);
    }

    const handleSubmitChange = (e) => {
        e.preventDefault();
        handleSearch();
    }

    const handleGroup = () => {
        setGroupClick(!groupclick);
        setClick(false);
    }

    const handleGroupusers = (e, item) => {
        e.preventDefault();
        //console.log(groupusers);
        const itemCount = Array.from(groupusers).filter(user => user.id === item.id).length;
        console.log(itemCount);
        let updatedGroupUsers
        if (itemCount === 0) {
            updatedGroupUsers=new Set([...groupusers],item); // Add one copy of the item back if there were multiple copies
        }
        if(item.count>1){
            updatedGroupUsers = new Set([...groupusers].filter(user => user.id !== item.id));
        }
        setGroupUsers(updatedGroupUsers);
        //console.log(updatedGroupUsers);
    };

    const handleGroupChat = (e) => {
        e.preventDefault();
        setGroupChat(e.target.value);
    }

    const handleGroupnameModify = (e) =>{
        e.preventDefault();
        setGroupNameModify(e.target.value);
    }
   const handleGroupSubmitChange = async (e) => {
    
        e.preventDefault(); // Prevent the default form submission
    
        try {
            const { data } = await axios.post("http://localhost:8000/chat/group", {
            email: email,
            users:Array.from(groupusers),
            name: groupname,
            }, { withCredentials: true });

            const { success, message } = data;
            alert(message);
            console.log(message);
        } catch (error) {
            console.error("Error:", error);
            setMessage(error.message);
        }
    };

    const handlegroupuserchange = async(e,item) =>{
        //e.preventDefault();
        console.log(item);
        // const updatedUsersArray = Array.from(groupusers);
        // const updatedUsersList = updatedUsersArray.filter(user => user.id !== item.id);
        // const updatedGroupUsers = new Set(updatedUsersList);
        // setGroupUsers(updatedGroupUsers);
        const updatedGroupUsers = new Set([...groupusers].filter(user => user.id !== item.id));
        setGroupUsers(updatedGroupUsers);
        console.log(groupusers);
    }
    const handleGroupChatWindow = async(e,item) => {
        e.preventDefault();
        setGroupChatClick(true);
        setGroupChatName(item.chatName);
        const temp = item.mergeData.map((it) => ({
            item: it.item,
            name: it.name,
            role: it.role
        }));
        setGroupUserData(temp);
        // console.log(groupUserData);
        setGroupChatId(item._id);
    }
    
    const handleGroupupdate = async(e) =>{
        e.preventDefault();
        console.log(groupUserData);

        const convertedData = groupUserData.map((item) => ({
            id: item.item,
            nam: item.name,
            role: item.role
        }));
            setGroupUsers((prevGroupUsers) => new Set([...prevGroupUsers, ...convertedData]));
        console.log(groupUserData);
        console.log(groupusers);
        setGroupModify(!groupModify);
    }

    const handleGroupChatName = async(e) =>{
        e.preventDefault();
        setGroupChatName(e.target.value);
    }
    const handleModifyGroupChatName = async (e) =>{
        console.log(groupChatId,groupChatName);
        e.preventDefault();
        try{
            const { data } = await axios.put("http://localhost:8000/chat/rename",
            {
                    chatId:groupChatId,
                    chatName:groupNameModify,
            },{withCredentials:true});
            console.log(data);
            const {success, message, updatedchat } = data;
            if(success){
                setGroupChatName(updatedchat.chatName);
            }
            setMessage(message);
        }catch (error) {
            console.error("Error:", error);
            setMessage(error.message);
        }
    }
// useEffect(() => {
//     // Add event listener to close dropdowns when clicking anywhere on the screen
//     const closeDropdowns = () => {
//       setGroupClick(false);
//     };

//     if (groupclick) {
//       document.addEventListener('click', closeDropdowns);
//     }

//     return () => {
//       // Remove event listener when component unmounts
//       document.removeEventListener('click', closeDropdowns);
//     };
//   }, [groupclick]);


  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div>
        <a href="" onClick={(e)=>handleChange(e)}>Search<FontAwesomeIcon icon={faSearch} /> </a>

        { click ?(<>
            <input type="text" id="key" name="key" value={search} autoComplete='off' autoFocus onChange={(e)=>handleKeyChange(e)}/>
            <button onClick={(e)=>handleSubmitChange(e)}>send</button>
                <ul>
                    {userData.map((item) => (
                        
                        <li onClick={(e)=>handleitem(e,item.id)}>
                            <ul >
                                <li>Name: {item.nam}</li>
                                <li>Email: {item.email}</li>
                                <li>User Type: {item.role}</li>
                            </ul>
                        </li>
                    ))}
                    
                </ul></>
        ) :(
            <div>
                
            </div>
            )
        }
    </div>
    <div>
        <h3 onClick={fetchChats}> My Chats </h3>
        <button onClick={handleGroup} >New Group Chat <FontAwesomeIcon icon={faPlus} /> </button>
        {
            groupclick ? (
                // className={`dropdown-content stu ${groupclick ? 'show' : ''}`
            // onSubmit={(e)=>handleGroupSubmitChange(e)}}
                <div>
                    <form action="/chat/group"  >
                        <input type="text" id="groupname" name="groupname" 
                        value={groupname} autoComplete='off' autoFocus onChange={(e)=>handleGroupChange(e)}
                        placeholder='Enter the chat name'/>
                        <input type="text" id="searh" name="searh" 
                        value={search} autoComplete='off' autoFocus onChange={(e)=>handleKeyChange(e)}
                        placeholder='Enter the users eg : mamatha'/>
                        <button onClick={(e)=>handleSubmitChange(e)}>send</button>
                        <div>
                            {groupusers.size > 0 ? (
                                [...groupusers].map((item) => (
                                <p key={item.item}>{item.nam}<FontAwesomeIcon icon={faXmark} onClick={(e)=>handlegroupuserchange(e,item)} /></p>
                                ))
                            ) : (
                                <div>No users selected Yet</div>
                            )}
                            </div>
                            
                        <ul>
                        {userData.map((item) => (
                        
                        <li onClick={(e)=>handleGroupusers(e,item)}>
                            <ul>
                                <li>Name: {item.nam}</li>
                                <li>Email: {item.email}</li>
                                <li>User Type: {item.role}</li>
                            </ul>
                        </li>
                    ))}
                    
                    
                    </ul>
                    <button type="submit" >SUBMIT</button>
                    </form>
                </div>
            ):(
                <div></div>
            )
        }
        { chat.length>0 ?(
                <ul>
                    {chat.map((item) => (
  <li key={item._id}>
    {item.mergeData.length === 1 ? (
      item.mergeData.map((it) => (
        <ul key={it.item}>
          <li>{it.name}</li>
          <li>{it.role}</li>
        </ul>
      ))
    ) : (
      <ul onClick={(e)=>handleGroupChatWindow(e,item)}>
        <li>{item.chatName}</li>
        <li>Group Chat</li>
      </ul>
    )}
  </li> 
))}</ul>
        ) :(
            <div>
                Sorry no data found
            </div>
            )
        }
         { groupChatClick ?(
            <div>
                <h3>{groupChatName}</h3>

                <form action="">
                    <FontAwesomeIcon icon={faEye} onClick={(e)=>handleGroupupdate(e)}/>
                    <input type="text" id="groupchat" name="groupchat" value={groupChat} onChange={(e)=>handleGroupChat(e)} />
                </form>
            </div>
        ) :(
            <div>
                <h2>Click on Chats to start Chating</h2>
            </div>
            )
        }
         { groupModify ?(
            <div>
                <form action="">
                    <input type="text" id="groupchat" name="groupchat" value={groupNameModify}  onChange={(e)=>handleGroupnameModify(e)}/>
                    <button onClick={(e)=>handleModifyGroupChatName(e)}>Update</button>
                    <input type="text" id="sear" name="sear" 
                        value={search} autoComplete='off' autoFocus onChange={(e)=>handleKeyChange(e)}
                        placeholder='Enter the users eg : mamatha'/>
                        <button onClick={(e)=>handleSubmitChange(e)}>send</button>
                        <div>
                            {/* {groupUserData.length > 0 ? (
                                [...groupUserData].map((item) => (
                                <p key={item.item}>{item.name}<FontAwesomeIcon icon={faXmark} onClick={(e)=>handlegroupuserchange(e,item)} /></p>
                                ))
                            ) : (
                                <div>No</div>
                            )} */}
                            {groupusers.size > 0 ? (
                                [...groupusers].map((item) => (
                                <p key={item.item}>{item.nam}<FontAwesomeIcon icon={faXmark} onClick={(e)=>handlegroupuserchange(e,item)} /></p>
                                ))
                            ) : (
                                <div></div>
                            )}
                            </div>
                            
                        <ul>
                        {userData.map((item) => (
                        
                        <li onClick={(e)=>handleGroupusers(e,item)}>
                            <ul>
                                <li>Name: {item.nam}</li>
                                <li>Email: {item.email}</li>
                                <li>User Type: {item.role}</li>
                            </ul>
                        </li>
                    ))}
                    
                    
                    </ul>
                    <button type="submit" >SUBMIT</button>
                    </form>
                </div>
                
        ) :(
            <div>
                
            </div>
            )
        }

    </div>
    {Role === "Admin" ? (
    <button>
      <a href="/admin">Back</a>
    </button>
  ) : Role=="teacher" ? (
    <button>
      <a href="/teacher">Back</a>
    </button>
  ):Role==="Parents"?(
    <button>
      <a href="/parents">Back</a>
    </button>
  ):(<button>
      <a href="/student">Back</a>
    </button>)}
    <Footer />
    </>
  );
}

export default Chat;
