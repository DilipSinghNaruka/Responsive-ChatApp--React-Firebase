import { useEffect, useState } from "react";
import "./App.css";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email });
        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  };

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(
    () => {
      onChildAdded(chatListRef, (data) => {
        setChats((chats) => [...chats, data.val()]);
        setTimeout(() => {
          updateHeight();
        }, 100);
        // eslint-disable-next-line
      });
    },
    // eslint-disable-next-line
    []
  );

  const sendChat = (e) => {
    e.preventDefault();
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });
    setMsg("");
  };

  return (
    <div>
      {user.email ? null : (
        <div className="loginButton">
          <p>Press button to login your account</p>
          <button
            onClick={(e) => {
              googleLogin();
            }}
          >
            Google SignIn
          </button>
        </div>
      )}
      {user.email ? (
        <div>
          <h3>User : {user.name}</h3>
          <div id="chat" className="chat_container">
            {chats.map((c, i) => (
              <div
                key={i}
                className={`container ${
                  c.user.email === user.email ? "me" : ""
                }`}
              >
                <p className="chatbox">
                  <strong>{c.user.name}:</strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={sendChat} className="btm">
            <input
              type="text"
              placeholder="Type your message here..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default App;
