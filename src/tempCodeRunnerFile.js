{
//       el.scrollTop = el.scrollHeight;
//     }
//   };

//   useEffect(
//     () => {
//       onChildAdded(chatListRef, (data) => {
//         setChats((chats) => [...chats, data.val()]);
//         setTimeout(() => {
//           updateHeight();
//         }, 100);
//         // eslint-disable-next-line
//       });
//     },
//     // eslint-disable-next-line
//     []
//   );

//   const sendChat = (e) => {
//     e.preventDefault();
//     const chatRef = push(chatListRef);
//     set(chatRef, {
//       user,
//       message: msg,
//     });
//     setMsg("");
//   };
