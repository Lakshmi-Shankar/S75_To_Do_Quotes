import React, { useState } from 'react';

const LandingPage = ({ projectName }) => {
    const [entity, setEntity] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/");
            if (!response.ok) {
                console.log("Error");
            }
            const data = await response.json();
            console.log(data);
            setEntity(data);
        } catch {
            console.log("error");
        }
    };

    return (
        <div className='container'>
            <div className='mainBox'>
                <h2>This is my ASAP Project.</h2>
                <h4>| {projectName} |</h4>
                <hr />
                <p>
                    This application helps users to manage their tasks efficiently by combining time management tools with motivational support.<br />
                    Users can set specific tasks, assign deadlines, and activate timers to focus on completing each goal. <br />
                    To ensure users stay motivated, the app delivers inspiring quotes tailored to the task start times. <br />
                    By combining productivity techniques with motivational cues, this app aims to help users stay consistent and energized in achieving their goals.
                </p>
                <h2>Entities from the DB</h2>
                <button onClick={fetchData}>Fetch Data</button>
                <div className='entitiesContainer'>
                    {entity.map((item, i) => (
                        <div key={i} className='entityBox'>
                            <h3>{item.id}</h3>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                body {
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #1e3c72, #2a5298);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    max-width: 800px;
                    gap: 20px;
                }
                .mainBox {
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    color: #333;
                    width: 100%;
                    transition: transform 0.3s ease-in-out;
                }
                .mainBox:hover {
                    transform: scale(1.02);
                }
                h2, h4 {
                    color: #007bff;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                button {
                    background: linear-gradient(135deg, #ff758c, #ff7eb3);
                    border: none;
                    padding: 12px 25px;
                    color: white;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
                    font-size: 16px;
                    font-weight: bold;
                }
                button:hover {
                    background: linear-gradient(135deg, #ff7eb3, #ff758c);
                    transform: scale(1.05);
                }
                .entitiesContainer {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 20px;
                }
                .entityBox {
                    background: linear-gradient(135deg, #56ccf2, #2f80ed);
                    padding: 15px;
                    border-radius: 10px;
                    color: white;
                    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.2);
                    text-align: left;
                    font-weight: bold;
                    transition: transform 0.3s ease-in-out;
                }
                .entityBox:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
