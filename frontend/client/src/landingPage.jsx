import React from 'react';
import './App.css'

const LandingPage = ({projectName}) => {
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
        </div>
    );
}

export default LandingPage;
