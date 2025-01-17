import React from "react";
import { Item, Image } from "semantic-ui-react";
//Styles
import {
  Card,
  CardText,
  CardHeader,
  ModalContent,
  ModalProfileLeft,
  ModalProfileRight,
  ModalProfileContent,
  ModalHeading,
  ModalSubHeading,
  InfoIcon,
  DelIcon,
  Icon,
  IconGroup,
  CancelButton,
  RepoCard,
  FillerImageDiv,
  FillerContent,
  FillerImage
} from "../styles/FriendCardStyle";

//React-Modal
import Modal from "react-modal";
import  ModalStyle from "../styles/ModalStyle";
// Action Creator
import { reloadComponentAction } from "../../action/index";
//Icon
import { BsThreeDotsVertical as Dot } from "react-icons/bs";
import { RiDeleteBin6Line as Delete } from "react-icons/ri";
import { VscGlobe, VscGithub } from "react-icons/vsc";
import { FiTwitter } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
//Axios
import axios from "axios";
//react redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//Filler images
import filler from "../images/filler-image/repofiller.svg";


Modal.setAppElement("#root");

class FriendCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      user: {},
      screen : window.matchMedia("(max-width: 991px)")
    };
  }
  componentDidMount = () => {
    //fetching card user
    axios({
      url: "/userinfo/fetchuser/" + this.props.fid,
      method: "GET",
    })
      .then((response) => {
        this.setState({ user: response.data }, () => {
          // this.props.avatar=this.state.user.avatar;
          // this.props.name=this.state.user.name;
          // this.props.bio=this.state.user.bio;
          // console.log("fecthed user data from modal is: ",this.state.user);
        });
      })
      .catch((err) => {
        console.log("user calling failed", err);
      });
    this.setState({screen:window.matchMedia("(max-width: 991px)")})  
  };
  //? Can't perform a React state update on an unmounted component.
  componentWillUnmount() {
    this._isMounted = false;
  }
  deleteFriend = () => {
    // console.log("delete calls");
    axios({
      url: "/userinfo/delete",
      method: "POST",
      data: { fid: this.props.fid },
    })
      .then(() => {
        // console.log("successfullt deleted friend");
        // this.props.reloadComponent();
        // alert(`You have deleted ${this.props.name} from your friendlist.`);
        this.props.reloadComponentAction();
      })
      .catch((err) => {
        console.log("error while deleting friend", err);
      });
  };
  //? Fetch designated user's repo
  fetchRepos = () => {
    const currUser = this.state.user;
    if (currUser.pinnedrepos) {
      if (currUser.pinnedrepos.length === 0) {
        return (
          <FillerImageDiv>
            <FillerImage centered src={filler} size="medium" rounded />
            <FillerContent>Have nothing to show</FillerContent>
          </FillerImageDiv>
        )
      }
      // console.log("repos are: ", currUser.pinnedrepos.length);
      const repos = currUser.pinnedrepos.map((repo) => {
        const currRepo = `https://github-readme-stats.vercel.app/api/pin/?username=${currUser.username}&repo=${repo}&show_icons=true&theme=blue-green&line_height=27&title_color=FFFFFF&bg_color=001E19&hide_border=true`;
        return <RepoCard key={currRepo} centered size="large" src={currRepo} />;
      });
      return repos;
    }
  };
  openModal = () => {
    this.setState(
      {
        modalIsOpen: true,
      },
      function () {
        // console.log("openModal: ", this.state.modalIsOpen);
      }
    );

  };

  closeModal = () => {
    this.setState(
      {
        modalIsOpen: false,
      },
      function () {
        //console.log("closeModal: ", this.state.modalIsOpen);
      }
    );
  };
  render() {
    return (
      <Card raised>
        <Item.Group divided>
          <Item>
            <Image
              alt={this.state.user.avatar}
              size="tiny"
              circular
              src={this.state.user.avatar}
            />
            <Item.Content>
              <CardHeader>
                <Item.Header>
                  {this.state.user.name}
                  <InfoIcon onClick={this.openModal}>
                    <Dot />
                  </InfoIcon>
                  <DelIcon onClick={this.deleteFriend}>
                    <Delete />
                  </DelIcon>
                </Item.Header>
              </CardHeader>
              <Item.Meta></Item.Meta>
              <Item.Description>
                <CardText>
                  {this.state.user.bio
                    ? this.state.user.bio
                    : "Hello, I am Biryani Monster to cheer you up!"}
                </CardText>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          style={ModalStyle(this.state.screen)}
          contentLabel="Example Modal"
        >
          <ModalContent>
            {/*//? LEFT SECTION */}
            <ModalProfileLeft>
              <ModalProfileContent>
                <Image
                  src={this.state.user.avatar}
                  centered
                  circular
                  size="small"
                />
                <ModalHeading>{this.state.user.name}</ModalHeading>
                <ModalSubHeading>{this.state.user.bio}</ModalSubHeading>
                {/* {console.log("user blog link from friendscard: ", this.state.user.blog)} */}
                <IconGroup>
                  <Icon href={this.state.user.blog}>
                    <VscGlobe />
                  </Icon>
                  <Icon href={"https://github.com/" + this.state.user.username}>
                    <VscGithub />
                  </Icon>
                  <Icon
                    href={"https://twitter.com/" + this.state.user.twitter_acc}
                  >
                    <FiTwitter />
                  </Icon>
                </IconGroup>
                <CancelButton>
                  <ImCancelCircle onClick={this.closeModal} />
                </CancelButton>
              </ModalProfileContent>
            </ModalProfileLeft>
            {/*//? RIGHT SECTION */}
            <ModalProfileRight>
              {this.fetchRepos()}
            </ModalProfileRight>
          </ModalContent>
        </Modal>
      </Card>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ reloadComponentAction }, dispatch);
};
export default connect(null, mapDispatchToProps)(FriendCard);
