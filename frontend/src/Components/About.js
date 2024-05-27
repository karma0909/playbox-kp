import React from 'react'
// import '../Components/About.css'
import '../StyleSheets/About.css'

export default function About() {
    return (
        <>
            <section className="about-us">
                <div className="about">
                    {/* <img src={require('../Components/The-Turf-Arena-Box-cricket-crikbox-img-5.jpg')} class="pic"/> */}
                    <div className="text">
                        <h2>About Us</h2>
                        <h5>
                            CRICKET | PICKLE BALL | FOOTBALL
                        </h5>
                        <h5>
                        Welcome to our Box Cricket haven! Unleash your cricketing passion with our unique twist on the classic game. Experience the thrill of fast-paced, compact matches in a box-sized arena. Join us for unparalleled excitement, camaraderie, and the pure joy of playing cricket in a whole new way.
                        </h5>
                        <div className="data">
                            <a href="#" className="hire">
                                Hire Me
                            </a>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
