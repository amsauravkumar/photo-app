import React, { Component } from "react";
import Post from "../../components/post";
import { getImages } from "../../services/posts.service";
import styles from "./home.module.css";
import Modal from "react-modal";
import ImageModal from "../../components/model";
import { isMobile } from "react-device-detect";
import PageTitle from "../../components/pageTitle";

interface HomePageStates {
  feedList: Array<any>;
  isModalOpen: boolean;
}

interface HomePageProps {}

class FeedsPage extends Component<HomePageProps, HomePageStates> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      feedList: [],
      isModalOpen: false,
    };
    this.onClick = this.onClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  page: number = 1; // TODO
  modalImage: string = "";
  isGreyScales: boolean = false;

  componentDidMount() {
    this.getImageList();
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
      document.documentElement.offsetHeight
    )
      return;
    this.page = this.page + 1;
    this.getImageList();
  };

  async getImageList() {
    try {
      const data = await getImages({
        page: this.page,
        limit: this.page === 1 ? (isMobile ? 12 : 60) : isMobile ? 4 : 10,
      });
      this.setState((prevState) => {
        return {
          feedList: [...prevState.feedList, ...data],
        };
      });
    } catch (err) {
      console.error(err);
    }
  }

  onClick(params: any) {
    const { isGreyScale, download_url } = params;
    this.modalImage = download_url;
    this.isGreyScales = isGreyScale;
    this.setState((prevValue) => {
      return {
        isModalOpen: !prevValue.isModalOpen,
      };
    });
  }

  toggleModal() {
    this.setState((prevValue) => {
      return {
        isModalOpen: !prevValue.isModalOpen,
      };
    });
  }

  render() {
    return (
      <div>
        <PageTitle />
        <div className={styles.imageContainer}>
          {this.state.feedList.map((post) => {
            return (
              <Post postData={post} key={post.id} onClick={this.onClick} />
            );
          })}
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleModal}
          contentLabel={styles.Mydialog}
          className={styles.mymodal}
          ariaHideApp={false}
          overlayClassName={styles.myoverlay}
          closeTimeoutMS={500}
        >
          <ImageModal
            imageurl={this.modalImage}
            isGreyScale={this.isGreyScales}
          ></ImageModal>
        </Modal>
      </div>
    );
  }
}

export default FeedsPage;
