import React from 'react'
import { Redirect } from 'react-router-dom'
import uuid from 'uuid/v4'
import { ColorContext } from '../context/colorcontext' 
const socket  = require('../connection/socket').socket

class CreateNewGame extends React.Component {
    state = {
        didGetUserName: false,
        inputText: "",
        gameId: ""
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }
    
    send = () => {
        const newGameRoomId = uuid()
        this.setState({ gameId: newGameRoomId })
        socket.emit('createNewGame', newGameRoomId)
    }

    typingUserName = () => {
        this.setState({ inputText: this.textArea.current.value })
    }

    render() {
        return (
            <div style={{
                backgroundColor: '#1a1a1a',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Segoe UI', Roboto, sans-serif"
            }}>
                {this.state.didGetUserName ? (
                    <Redirect to={"/game/" + this.state.gameId}>
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem',
                            backgroundColor: '#252525',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                        }}>
                            <div style={{
                                display: 'inline-block',
                                width: '50px',
                                height: '50px',
                                border: '4px solid #3a3a3a',
                                borderTopColor: '#3498db',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                marginBottom: '1.5rem'
                            }}></div>
                            <h2 style={{
                                color: '#fff',
                                margin: '0 0 1rem 0',
                                fontSize: '1.5rem'
                            }}>
                                Game Created Successfully!
                            </h2>
                            <button style={{
                                padding: '12px 24px',
                                fontSize: '1rem',
                                backgroundColor: '#3498db',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}>
                                Start Game
                            </button>
                        </div>
                    </Redirect>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        width: '100%',
                        maxWidth: '600px',
                        padding: '2rem'
                    }}>
                        <h1 style={{
                            fontSize: '2.5rem',
                            color: '#fff',
                            marginBottom: '3rem',
                            fontWeight: 300
                        }}>
                            Create New Game
                        </h1>

                        <input
                            ref={this.textArea}
                            onInput={this.typingUserName}
                            placeholder="Enter your username..."
                            style={{
                                width: '100%',
                                padding: '1rem 1.5rem',
                                fontSize: '1.1rem',
                                backgroundColor: '#252525',
                                border: '2px solid #3a3a3a',
                                borderRadius: '8px',
                                color: '#fff',
                                marginBottom: '1.5rem',
                                transition: 'all 0.3s ease',
                                outline: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#3498db';
                                e.target.style.boxShadow = '0 0 12px rgba(52, 152, 219, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#3a3a3a';
                                e.target.style.boxShadow = 'none';
                            }}
                        />

                        <button
                            style={{
                                width: '100%',
                                padding: '1rem 2rem',
                                fontSize: '1.1rem',
                                backgroundColor: this.state.inputText.length > 0 ? '#3498db' : '#2c3e50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: this.state.inputText.length > 0 ? 'pointer' : 'not-allowed',
                                transition: 'all 0.3s ease',
                                position: 'relative'
                            }}
                            disabled={!(this.state.inputText.length > 0)}
                            onClick={() => {
                                this.props.didRedirect()
                                this.props.setUserName(this.state.inputText)
                                this.setState({ didGetUserName: true })
                                this.send()
                            }}
                        >
                            Create Game
                            {this.state.inputText.length === 0 && (
                                <span style={{
                                    position: 'absolute',
                                    right: '20px',
                                    display: 'inline-block',
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTopColor: '#fff',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }}></span>
                            )}
                        </button>
                    </div>
                )}

                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    input::placeholder {
                        color: #666;
                    }
                `}</style>
            </div>
        )
    }
}

const Onboard = (props) => {
    const color = React.useContext(ColorContext)
    return <CreateNewGame didRedirect={color.playerDidRedirect} setUserName={props.setUserName}/>
}

export default Onboard