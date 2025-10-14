import { useState, useEffect} from 'react'
import './App.css'
import Map from './components/Map'
import Dashboard from './components/Dashboard'
import NumPicker from './components/NumPicker'


function App() {

  const [curBaloon, setCurBaloon] = useState(null);
  const [data, setData] = useState([]);
  const [hour, setHour] = useState(0);


  function updateCurBaloon(index){
    setCurBaloon(data[index]);
  }

  function updateHour(newHour){
    setHour(newHour);
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          let adjustment = '';
          if (hour < 10){
            adjustment = '0';
          }
          const response = await fetch("/treasure/" + adjustment + hour + ".json");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [hour]);


  return (
    
      <div className='app'>
        <Dashboard
        balloon = {curBaloon}
        hour = {hour}
        />
        <Map 
        data = {data}
        update = {updateCurBaloon}
        />
        <NumPicker
        update = {updateHour}
        />
      </div>
    
  )
}

export default App;
