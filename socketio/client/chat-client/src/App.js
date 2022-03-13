import "./App.css";
import {io} from "socket.io-client";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {useState} from "react";
import {Box} from "@mui/system";

const serverHttpUrl = "http://localhost:9700";

const socket = io(serverHttpUrl);
socket.on("connect", () => console.log("connection id at client:", socket.id));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [openCreateRoomModal, setOpenCreateRoomModal] = useState(false);
  const [currentChat, setCurrentChat] = useState("");
  const [roomName, setRoomName] = useState("");
  const [chatMesage, setChatMessage] = useState("");
  const handleCreateRoom = () => {
    setOpenCreateRoomModal(true);
  };

  const [savedChats, setSavedChats] = useState([]);
  socket.on("messageFromServer", (data) => {
    console.log("data", data);
    setSavedChats(data.savedChats);
  });

  const [rooms, setRooms] = useState({});
  return (
    <div className="App">
      <header className="App-header">
        <Modal
          open={openCreateRoomModal}
          onClose={() => setOpenCreateRoomModal(false)}
        >
          <Box style={modalStyle}>
            <Card>
              <CardHeader title="Type Room Name" />
              <CardContent>
                <TextField
                  autoFocus={true}
                  value={roomName}
                  onChange={(event) => setRoomName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && roomName) {
                      setRooms({...rooms, [roomName]: []});
                      setRoomName("");
                      setOpenCreateRoomModal(false);
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        </Modal>
        <Drawer variant="permanent">
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6">Chat rooms</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleCreateRoom}>Create Room</Button>
            </Grid>
          </Grid>
          <Grid container>
            {Object.keys(rooms).map((roomName) => (
              <Grid item xs={12}>
                <Button onClick={() => setCurrentChat(roomName)}>
                  {roomName}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Drawer>
        {currentChat && (
          <Card>
            <CardHeader title={"room for " + currentChat} />
            <CardContent>
              {savedChats.map((chat) => (
                <Typography>{chat}</Typography>
              ))}
              <TextField
                value={chatMesage}
                onChange={(event) => setChatMessage(event.target.value)}
              />
              <Button
                onClick={() =>
                  socket.emit("messageToServer", {data: chatMesage})
                }
              >
                Send
              </Button>
            </CardContent>
          </Card>
        )}
      </header>
    </div>
  );
}

export default App;
