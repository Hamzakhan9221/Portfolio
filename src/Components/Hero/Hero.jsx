import React from 'react'
import './Hero.css'
import Hamza from '../../assets/Hamza.jpeg'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <img src={Hamza} alt="Muhammad Hamza" className="hero-img" />

      <h1 className="hero-title">
        I'm <span>Muhammad Hamza,</span> Frontend developer based in Pakistan.
      </h1>

      <p className="hero-text">
        I am a frontend developer from Pakistan with 1 year of coding experience
        and professional experience at Next Step Solution.
      </p>

      <div className="hero-action">
        <a href="#contact" className="hero-connect">Connect With Me</a>
        <a href="/resume.pdf" download className="hero-resume">My Resume</a>
      </div>
    </section>
  )
}

export default Hero