import Announcement from "./components/Announcement";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="bg-white font-satoshi">
      <Announcement />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
