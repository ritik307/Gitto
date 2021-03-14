import React from "react";
import {
    Logo,
    IconGroup,
    IconContent,
    Icon,
} from "../styles/DashboardStyle";
// ICONS
import { AiOutlineMessage as Chat, } from "react-icons/ai";
import { RiGroup2Line as Friends } from "react-icons/ri";
import { IoMdLogOut as Logout} from "react-icons/io";
import { CgProfile as ProfilePic } from "react-icons/cg";
import logo from "../images/logopen3.svg";

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <Logo src={logo} color="white" size="mini" />
        <IconGroup>
          <Icon to="/dashboard/">
            <Chat />
            <IconContent>Chat</IconContent>
          </Icon>
          <Icon to="/dashboard/">
            <Friends />
            <IconContent>Friends</IconContent>
          </Icon>
          <Icon to="/dashboard/profile">
            <ProfilePic />
            <IconContent>Profile</IconContent>
          </Icon>
          <Icon to="/">
            <Logout />
            <IconContent>Logout</IconContent>
          </Icon>
        </IconGroup>
      </div>
    );
  }
}
export default Sidebar;
