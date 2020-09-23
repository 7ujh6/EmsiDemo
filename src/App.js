import React, {useEffect, useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import {ScoreCard} from './components/score-card/score-card.component.jsx'
import './App.scss';


const App = () =>
    {
      const [school_data, set_school_data] = useState(null);
      useEffect(() => {
        const get_school_data = async () => {
          try {
           await (await fetch('/ed/collegescorecard/v1/schools.json?per_page=100&_fields=school.name,school.school_url,id,school.city,school.state,latest.student.size,latest.admissions.admission_rate.overall,latest.programs.cip_4_digit.credential,latest.programs.cip_4_digit.title&api_key=WmF34z2YnPUXOVCXc6HwxGimrLIgTCf1wycJxFY5'))
            .json()
            .then((data) => {
              set_school_data(data.results)
            })
          } catch (ex) {
            console.log(ex);
          }
        }
        get_school_data();
      }, [])
    
    return <div className="App">
      {
        !school_data ? <div className="spinner-container"><ClipLoader size={150} color={"#41d592"} css=""/></div> : 
          <div className='cards-container'>
            {school_data.map((school, idx) => <ScoreCard school={school} key={idx}/>)}
          </div>
      }
      <div style={{padding:`20% 0px`}}>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
    }


export default App;
