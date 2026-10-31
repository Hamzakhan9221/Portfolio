import React from 'react'
import './Hero.css'
import Hamza from '../../assets/Hamza.jpeg'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <img src={Hamza} alt="Muhammad Hamza" className="hero-img" />

      <h2 className="hero-title">
        I'm <span>Muhammad Hamza,</span> Frontend Developer & Aspiring MERN Stack Developer.
      </h2>

      <p className="hero-text">
        I am a passionate frontend developer from Pakistan, specializing in React.js
        and modern web development. Currently expanding my skills towards becoming a
        MERN Stack Developer.
      </p>

      <div className="hero-action">
        <a href="#contact" className="hero-connect">Connect With Me</a>
        <a href="/resume.pdf" download className="hero-resume">My Resume</a>
      </div>
    </section>
  )
}

export default Hero