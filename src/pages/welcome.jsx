import React, { useEffect, useState } from 'react';
import start from "../images/start.png";
import optional from "../images/optional.jpg";
import login from "../images/login.jpg";
import business from "../images/business.png";

const WelcomePage = () => {
    const [scrollPoint, setScrollPoint] = useState(0);
    const [nextDiv, setNextDiv] = useState("#c2");
    const [animation, setAnimation] = useState("")

    const listenToScroll=()=>{
        const div =  document.getElementById("carosel");

        const divScroll = div.scrollLeft;
        const width = div.scrollWidth;
        const scrolled = divScroll / width;

        setScrollPoint(scrolled);
    }

    useEffect(()=>{
        if (scrollPoint <= 0.1) {
            setNextDiv("#c2");
            setAnimation("move-origin .5s forwards")
        }else if(scrollPoint <= 0.4){
            setNextDiv("#c3");
            setAnimation("move2 .5s forwards")
        }else if(scrollPoint <= 0.65){
            setNextDiv("#c4");
            setAnimation("move3 .5s forwards")
        }else{
            setNextDiv("#c1");
            setAnimation("move4 .5s forwards")
        }
    },[scrollPoint])

    console.log({scrollPoint})

    return (
        <div className="welcome">
            <div className="makers">
                <div className="active-bar"style={{animation: `${animation}`}}></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="carosel" id='carosel' onScroll={listenToScroll}>
                <div className="carosel-card" id='c1'>
                    <img src={business} alt="" />
                    <p>Welcome to <b>Notepro+</b></p>
                </div>
                <div className="carosel-card" id='c2'>
                    <img src={login} alt="" />
                    <p>Create an account with your <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span> account</p>
                </div>
                <div className="carosel-card" id='c3'>
                    <img src={optional} alt="" />
                    <p>Login with your <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span> account</p>
                </div>
                <div className="carosel-card" id='c4'>
                    <img src={start} alt="" />
                    <p><span>Create</span>,<span></span> <span></span><span></span><span>edit</span> and <span>delete</span> your notes. <br /> Click on Get Started to proceed</p>
                </div>
            </div>
            <a href={`${scrollPoint === 0.75 ? "/authenticate" : nextDiv}`} className="continue">{scrollPoint === 0.75 ?"Get Started" :"Next"}</a>
        </div>
    )
}

export default WelcomePage;