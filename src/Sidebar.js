import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import Avatar from '@mui/material/Avatar';
import MicNoneIcon from '@mui/icons-material/MicNone';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelect } from '@mui/base';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';

function Sidebar() {
    const user = useSelector(selectUser);
    // const { channels, setChannels } = useState([]);
    const [channels, setChannels] = useState([]);
    // console.log("user is: ", user);

    useEffect(() => {
        db.collection("channels").onSnapshot((snapshot) =>
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data(),
                }))
            )
        );
    }, []);

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new room name");
        if (channelName) {
            db.collection("channels").add({
                channelName: channelName,
            });
        }
    };

    return (
        <div className='sidebar'>
            <div className="sidebar__top">
                <h3>Rooms</h3>
                <ExpandMoreIcon />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({ id, channel }) => (
                        <SidebarChannel
                            key={id}
                            id={id}
                            channelName={channel.channelName}
                        />
                    ))}
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    {/* <h3>@{user.displayName}</h3> */}
                    <h3>@username</h3>
                    <p>#uid</p>
                    {/* <p>{user.uid.substring(0, 5)}</p> */}
                </div>
                <div className="sidebar__profileIcons">
                    <MicNoneIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar