import { Route, Routes } from "react-router-dom";
import { CustomerDetails, CustomerList, Home } from "./Pages";
import { Frame, Navbar } from "./Components";

function App() {
  return (
    <div>
      <Navbar />
      <Frame>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:customerId" element={<CustomerDetails />} />
        </Routes>
      </Frame>
    </div>
  );
}

export default App;
