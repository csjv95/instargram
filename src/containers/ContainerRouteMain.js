import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLocationModalState,
  changePostModalState,
  changeFollowModalState,
  changeSendModalState,
  changeSearchModalState,
} from "../redux/modules/modals/modalState";
import { barState } from "../redux/modules/progressBar/progressBar";
import RouteMain from "../routes/routeMain/routeMain";
import LoadingPage from "../Global/Loading/LoadingPage";
import { useHistory } from "react-router";
import { firebaseAuth } from "../service/firebase";
import saveMessagingDeviceToken from "../service/message/saveMessagingDeviceToken";
import { loginAsync } from "../redux/modules/auth/isLogin";
import { useMediaQuery } from "react-responsive";

const ContainerRouteMain = () => {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const pc = useMediaQuery({
    query: "(min-width:900px)",
  });

  const responsive = useMediaQuery({
    query: "(max-width:900px)",
  });

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        dispatch(loginAsync());
        saveMessagingDeviceToken(setToken);
      } else {
        // No user is signed in
        console.log("logOut");
        history.push({
          pathname: "/login",
        });
      }
    });
  }, [dispatch, history, token]);

  const changeLocationModal = () => dispatch(changeLocationModalState());
  const changePostModal = () => dispatch(changePostModalState());
  const changeFollowModal = () => dispatch(changeFollowModalState());
  const changeSendModal = () => dispatch(changeSendModalState());
  const changeSearchModal = () => dispatch(changeSearchModalState());
  const changeBarState = (bar) => dispatch(barState(bar));

  const {
    uploadModal,
    locationModal,
    postModal,
    followModal,
    sendModal,
    searchModal,
    mobileMenuModal,
    progressState,
  } = useSelector((state) => ({
    uploadModal: state.modalState.uploadModal,
    locationModal: state.modalState.locationModal,
    postModal: state.modalState.postModal,
    followModal: state.modalState.followModal,
    sendModal: state.modalState.sendModal,
    searchModal: state.modalState.searchModal,
    mobileMenuModal: state.modalState.mobileMenuModal.state,
    progressState: state.progressBar.progressState,
  }));

  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
  } = useSelector((state) => state.userData.userData);

  const { isLogin, loading, error } = useSelector((state) => state.loginState);

  if (userDataError) return <div>{userDataError}</div>;
  // loading true
  if (userDataLoading) return <LoadingPage />;
  // no data
  if (!userData) return <div>데이터가 존재하지 않음</div>;
  // data
  if (error) return <div>{error}</div>;

  return (
    <RouteMain
      isLogin={isLogin}
      loading={loading}
      uploadModal={uploadModal}
      locationModal={locationModal}
      postModal={postModal}
      followModal={followModal}
      sendModal={sendModal}
      searchModal={searchModal}
      mobileMenuModal={mobileMenuModal}
      changeLocationModal={changeLocationModal}
      changePostModal={changePostModal}
      changeFollowModal={changeFollowModal}
      changeSendModal={changeSendModal}
      changeSearchModal={changeSearchModal}
      progressState={progressState}
      changeBarState={changeBarState}
      userData={userData}
      pc={pc}
      responsive={responsive}
    />
  );
};

export default ContainerRouteMain;
