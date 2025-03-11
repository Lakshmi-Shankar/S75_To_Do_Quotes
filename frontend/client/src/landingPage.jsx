import React, { useState } from 'react';
import './App.css'

const LandingPage = ({projectName}) => {
    const [entity, setEntity] = useState([]);
    const fetchData = async() =>{
        try{
            const response = await fetch("http://localhost:3000/api/items");
            if (!response.ok){
                console.log("Error")
            }
            const data = await response.json();
            setEntity(data)
        }
        catch{
            console.log("error")
        }
    }
    return (
        <div className='mainBox'>
            <h2>
                This is my ASAP Project.
            </h2>
            <h4>
            | {projectName} |
            </h4>
            <hr />
            <p>
                This application helps users to manage their tasks efficiently by combining time management tools with motivational support.<br/>
                Users can set specific tasks, assign deadlines, and activate timers to focus on completing each goal. <br/>
                To ensure users stays motivated, the app delivers inspiring quotes tailored to the task start times. <br/>
                By combining productivity techniques with motivational cues, this app aims to help users stay consistent and energized in achieving their goals.
            </p>
            <h2>Entities from the DB</h2>
            <button onClick={fetchData}>Fetch Data</button>
            <p>
                {
                    entity.map((item,i)=>(
                        <div key={i}>
                            <h3>{item.id}</h3>
                            <p>{item.name}</p>
                        </div>
                        
                    ))
                }
            </p>
        </div>
    );
}

export default LandingPage;
