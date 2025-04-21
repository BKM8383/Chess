import React, { useEffect, useState, useRef } from 'react';
import Peer from "simple-peer";
import styled from "styled-components";
const socket = require('../connection/socket').socket;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
`;

const VideoContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  max-height: calc(100vh - 80px);
`;

const VideoWrapper = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  min-height: 200px;
  max-height: 45vh;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
`;

const Controls = styled.div`
  height: 80px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #252525;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  min-width: 160px;

  &:hover {
    background-color: #2980b9;
  }
`;

const StatusMessage = styled.div`
  color: #ecf0f1;
  font-size: 1rem;
  text-align: center;
  padding: 5px;
`;

function VideoChatApp(props) {
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const userVideo = useRef();
  const partnerVideo = useRef();

  const config = {
    iceServers: [
      { 
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478"
        ]
      }
    ]
  };

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720 },
          audio: true 
        });
        setStream(mediaStream);
        if (userVideo.current) {
          userVideo.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initializeMedia();

    const handleIncomingCall = (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    };

    socket.on("hey", handleIncomingCall);

    return () => {
      socket.off("hey", handleIncomingCall);
    };
  }, []);

  const callPeer = (id) => {
    setIsCalling(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
      config: config
    });

    peer.on("signal", data => {
      socket.emit("callUser", { 
        userToCall: id, 
        signalData: data, 
        from: props.mySocketId
      });
    });

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    peer.on("error", err => {
      console.error("Peer connection error:", err);
      setIsCalling(false);
    });

    socket.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const acceptCall = () => {
    setCallAccepted(true);
    setReceivingCall(false); // Add this line
    setIsCalling(false);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
      config: config
    });

    peer.on("signal", data => {
      socket.emit("acceptCall", { 
        signal: data, 
        to: caller 
      });
    });

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.on("error", err => {
      console.error("Peer connection error:", err);
    });

    peer.signal(callerSignal);
  };

  return (
    <Container>
      <Controls>
        {callAccepted ? (
          <StatusMessage>
            Connected to {props.opponentUserName}
            <span role="img" aria-label="connected"> ✅</span>
          </StatusMessage>
        ) : (
          <>
            {!receivingCall && !isCalling && (
              <Button onClick={() => callPeer(props.opponentSocketId)}>
                Start Video Chat
              </Button>
            )}
            
            {receivingCall && (
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <StatusMessage>{props.opponentUserName} is calling...</StatusMessage>
                <Button onClick={acceptCall}>Accept</Button>
              </div>
            )}
            
            {isCalling && (
              <StatusMessage>Calling {props.opponentUserName}...</StatusMessage>
            )}
          </>
        )}
      </Controls>

      <VideoContainer>
        <VideoWrapper>
          {stream && (
            <Video
              playsInline
              muted
              ref={userVideo}
              autoPlay
            />
          )}
        </VideoWrapper>

        {callAccepted && (
          <VideoWrapper>
            <Video
              playsInline
              ref={partnerVideo}
              autoPlay
            />
          </VideoWrapper>
        )}
      </VideoContainer>
    </Container>
  );
}

export default VideoChatApp;