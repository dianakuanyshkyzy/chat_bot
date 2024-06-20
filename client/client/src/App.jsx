import {Route, Routes, Navigate} from "react-router-dom"
import Chat from "./pages/Chat"; 
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css"; 
import {Container} from "react-bootstrap"; 
import NavBar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/chatContext";
function App() {
  const {user} = useContext(AuthContext); 
  return (
    <>
    <ChatContextProvider user={user}>
    <NavBar />
     <Container className="text-secondary">
     <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/register" element= { user ? <Chat /> : <Register />} />
      <Route path="/login" element={ user ? <Chat /> : <Login />} />
      <Route path="*" element={<Navigate to="/"/>} />
     </Routes>
     </Container>
     </ChatContextProvider>
     </>
  )
}

export default App
