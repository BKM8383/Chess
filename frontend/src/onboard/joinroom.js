import React from 'react'
import JoinGame from './joingame'
import ChessGame from '../chess/ui/chessgame'

class JoinRoom extends React.Component {
    state = {
        didGetUserName: false,
        inputText: ""
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    typingUserName = () => {
        const typedText = this.textArea.current.value
        this.setState({ inputText: typedText })
    }

    render() {
        return (
            <div style={{
                backgroundColor: '#1a1a1a',
                minHeight: '100vh',
                color: '#e0e0e0',
                fontFamily: "'Segoe UI', Roboto, sans-serif",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {this.state.didGetUserName ? (
                    <div style={{ width: '100%' }}>
                        <JoinGame userName={this.state.inputText} isCreator={false} />
                        <ChessGame myUserName={this.state.inputText} />
                    </div>
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
                            Enter Your Username
                        </h1>

                        <input
                            ref={this.textArea}
                            onInput={this.typingUserName}
                            placeholder="Type your username..."
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
                                outline: 'none',
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
                                backgroundColor: '#3498db',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: this.state.inputText.length > 0 ? 1 : 0.6,
                                pointerEvents: this.state.inputText.length > 0 ? 'auto' : 'none'
                            }}
                            onClick={() => this.setState({ didGetUserName: true })}
                        >
                            Continue
                            {this.state.inputText.length === 0 && (
                                <span style={{
                                    display: 'inline-block',
                                    marginLeft: '1rem',
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

export default JoinRoom