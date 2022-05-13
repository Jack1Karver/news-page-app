import React from "react";
import { useNavigate } from "react-router";


const About = () => {
    const navigate = useNavigate()
    return (<div className="about">
        <h1>About</h1>
        developer: Artem Zavorotniy
        <br/>group: IVT-92
        <br/><button onClick={()=>{navigate('/news')}}>Back</button>
    </div>);
};

export default About