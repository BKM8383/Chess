import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
const socket = require('../connection/socket').socket;
const JoinGameRoom = (gameid, userName, isCreator) => {
    const idData = {
        gameId: gameid,
        userName: userName,
        isCreator: isCreator,
    };
    socket.emit('playerJoinGame', idData);
};
const JoinGame = (props) => {
    const { gameid } = useParams();
    const history = useHistory();  
    const [shouldHide, setShouldHide] = React.useState(false);
    const gameLink = `${window.location.origin}/game/${gameid}`;
        React.useEffect(() => {
        JoinGameRoom(gameid, props.userName, props.isCreator);
                socket.on('start game', () => {
            setShouldHide(true);
            history.push(`/game/${gameid}`);  
        });
                return () => socket.off('start game');
    }, [gameid, history, props.userName, props.isCreator]);
        const copyToClipboard = () => {
        navigator.clipboard.writeText(gameLink);
    };
        return shouldHide ? null : (
        <div
            style={{
                backgroundColor: '#1a1a1a', 
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Segoe UI', Roboto, sans-serif",
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    padding: '2rem',
                    backgroundColor: '#252525',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    maxWidth: '600px',
                    width: '90%',
                    color: '#fff', 
                }}
            >
                {/* Combined Loading Animation and Content */}
                <div style={{ marginBottom: '2rem' }}>
                    <div
                        style={{
                            display: 'inline-block',
                            width: '50px',
                            height: '50px',
                            border: '4px solid #3a3a3a',
                            borderTopColor: '#3498db',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '1.5rem',
                        }}
                    ></div>
                                        <h2
                        style={{
                            color: '#fff',
                            margin: '0 0 1rem 0',
                            fontSize: '1.5rem',
                        }}
                    >
                        Waiting for opponent...
                    </h2>
                </div>
                                {/* Shareable Link Section */}
                <div
                    style={{
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1rem',
                    }}
                >
                    <p
                        style={{
                            color: '#95a5a6',
                            margin: '0 0 1rem 0',
                            fontSize: '1rem',
                        }}
                    >
                        Share this link with your friend:
                    </p>
                                        <div
                        style={{
                            display: 'flex',
                            gap: '0.5rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <input
                            type="text"
                            value={gameLink}
                            readOnly
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                backgroundColor: '#333',
                                border: '1px solid #3a3a3a',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '0.9rem',
                                minWidth: '250px',
                            }}
                        />
                        <button
                            onClick={copyToClipboard}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#3498db',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                        >
                            Copy
                        </button>
                    </div>
                </div>
                                <p
                    style={{
                        color: '#95a5a6',
                        margin: '1rem 0 0 0',
                        fontSize: '0.9rem',
                    }}
                >
                    The game will start automatically when your friend joins
                </p>
            </div>
                        <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                body {
                    background-color: #1a1a1a !important; 
                    margin: 0;
                    padding: 0;
                }
            `}</style>
        </div>
    );
};
export default JoinGame;
