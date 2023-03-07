
import { Authenticator } from "./screens/Authenticator";
import { Amplify} from "aws-amplify";
import { Home } from "./pages/Home";
import AmplifyExports from "./aws-exports"

Amplify.configure(AmplifyExports)
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