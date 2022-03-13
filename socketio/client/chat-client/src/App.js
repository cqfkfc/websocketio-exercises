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

  const [roomName, setRoomName] = useState("");
  const handleCreateRoom = () => {
    setOpenCreateRoomModal(true);
  };

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
                    if (event.key === "Enter") {
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
                <Button>{roomName}</Button>
              </Grid>
            ))}
          </Grid>
        </Drawer>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
