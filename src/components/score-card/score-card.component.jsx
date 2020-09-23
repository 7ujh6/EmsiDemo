import React from 'react'
import './score-card.styles.scss'
import university from '../../university.svg'

export const ScoreCard = ({school}) => {

    const {"school.name": name,  "latest.admissions.admission_rate.overall": rate,
     "school.state": state, "school.city": city, "latest.student.size": size, "latest.programs.cip_4_digit": programs} = school;
    const program_map = new Map();
    const map_programs = program_map => {
        programs.map(program => 
            {   
                if (program_map.has(program.credential.title)) {
                    program_map.set(program.credential.title, program_map.get(program.credential.title)+1)
                } else {
                    program_map.set(program.credential.title, 1)
                } 

                return null;
            }) 
    }

    map_programs(program_map);
    const entry_array = [];
    for (let entry of program_map.entries()) {
        entry_array.push({key: entry[0], value: entry[1]});
    }    

    return <div className="score-card">
        <div className="card-header">
            <div className="school-logo-container"><img height="100" width="100" src={university} alt="university-logo"></img></div>
            <div className="info-container">
                <div className="header-element" style={{fontWeight: `bold`}}>{name}</div>
                <div className="header-element"><span style={{width:`50%`, borderRadius: `5%`, padding: `0 10px 0 10px`, backgroundImage: `linear-gradient(to bottom, #EBF5FB, #d0eff2)`}}>{city}, {state}</span></div>
                <div className="subheading">
                    <div className="header-element"><div>Student&nbsp;Size:</div><div className="card-header-numbers">{size}</div></div>
                    <div className="header-element"><div>Admission&nbsp;Rate:</div><span className="card-header-numbers">{Math.floor(rate * 100)}%</span>
                        <div style={{background: `linear-gradient(to right, #d0eff2 ${Math.floor(rate * 100)}%, #eff0f1 ${Math.floor((1 - rate) * 100)}%)`}} className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="horizontal-bar"></div>

        
        <div className="card-body">
            <span style={{fontWeight:`bold`}}>Available Program Counts:</span>           
                {entry_array.map((entry, idx) => <div key={idx} className="body-element">{entry.key}: <b>{entry.value}</b></div>)}
        </div>
    </div>
}