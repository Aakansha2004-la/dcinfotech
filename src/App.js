import './App.css';
import { Navbar, Header, Footer, Features, TrendingCourses, About } from './containers';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Features />
      <TrendingCourses />
      <About />
      <Footer />
    </div>
  );
}

export default App;
