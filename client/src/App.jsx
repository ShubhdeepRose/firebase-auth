import React, { useState } from "react";
import styled from "styled-components";
import api from "./services/axiosInstance";
import { app } from "./firebase/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginButton = styled.button`
  background-color: #ff2323;
  color: white;
  padding: 15px 25px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #c60000;
  }
`;

const ProfileBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px;
  text-align: center;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    margin-bottom: 15px;
  }

  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;   
  }
`;

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const OAuthResponse = await signInWithPopup(auth, provider);
      const idToken = await OAuthResponse.user.getIdToken();

      const response = await api.post(
        "/api/auth/google",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      setUserInfo(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <LoginButton onClick={handleOAuth}>Sign in with Google</LoginButton>
      {userInfo && (
        <ProfileBox>
          <h2>Welcome, {userInfo.name}!</h2>
          <p>Email: {userInfo.email}</p>
          <img
            src={userInfo.picture}
            alt="Profile"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
        </ProfileBox>
      )}
    </Container>
  );
};

export default App;
