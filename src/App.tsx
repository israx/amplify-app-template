
import { Authenticator } from "./screens/Authenticator";

import { Amplify, Auth} from "aws-amplify";
import { Home } from "./pages/Home";



function App() {
  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
    >
      <Authenticator>
        <Home />
      </Authenticator>
    </div>
  );
}

export default App;