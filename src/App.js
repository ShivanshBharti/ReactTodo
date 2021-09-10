import{
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import NotesList from './pages/NotesList';
import NotePage from './pages/NotePage';

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
        <Header/>
        <Route path='/' exact component ={NotesList} />
        <Route path="/note/:id" exact component = {NotePage}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
