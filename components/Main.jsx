import { useState , useEffect} from "react";
import useFetch from "../utils/useFetch";
import { Link } from "react-router-dom";
import Results from "./Results";
import Moon from "../moon.png";
import Sun from "../sun.png";
import "../src/styles.css";


const Main = () => {
    const [ searchTerm, setSearchTerm] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const apiURL =  'https://sharjeel-afridi.github.io/resolvexApi/api.json';

    function handleInput(e){
        setSearchTerm(e.target.value);
    }
    function handleClick(){
        setShowResults(true);
    }
    function toggleClick(){
        setIsDarkMode(!isDarkMode);
    }
    function handleKeyPress(event){
        if (event.key === 'Enter') {
          event.preventDefault();
          handleClick();
        }
      }
    useEffect(() =>{
        document.body.className = isDarkMode ? 'dark-mode' : '';
    },[isDarkMode]);
    const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const distanceFromBottom = 423.8;
      setSticky(offset > distanceFromBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    }, []);


    const apiResponse = useFetch(apiURL);
    

    return (
        <div className="container">
            <button className="toggle-btn" id="toggle-btn" onClick={toggleClick}><img src={isDarkMode ? Sun : Moon}/> </button>        
            <Link to="/pyqs" className={`route-btn ${isDarkMode ? 'dark-mode' : ''}`}>PYQ</Link>
            <div className="main">
                <div className="title">
                    <h1>resolveX</h1>
                </div>
                
            </div>
            <div className={`input-div ${isSticky ? 'sticky' : ''}`}>
                    <div className="form__group field">
                        <input  type="input" onChange={handleInput} onKeyDown={handleKeyPress} value={searchTerm} className={`form__field ${isDarkMode ? 'dark-mode' : ''}`} id="input-el" placeholder="Search notes here" required="" />
                        <label htmlFor="input-el" className="form__label">Search for notes here</label>
                    </div>
                    <button id="submit" onClick={handleClick} className={isDarkMode ? 'dark-mode' : ''}><span>SUBMIT</span></button>
            </div>
            {showResults && <Results api={apiResponse} input={searchTerm} />}
        </div>

    );
};

export default Main;