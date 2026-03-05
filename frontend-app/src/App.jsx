import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <AppRoutes />
      </div>

      <Footer />
    </>
  )
}

export default App;