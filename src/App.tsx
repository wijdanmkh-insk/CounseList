import Navbar from "./layout/Navbar"
import HeroImg from "./img/landing/hero.jpg"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";


export default function App() {
  const currentYear = new Date().getFullYear();

  const HOW_TO =[
    {step: 1, title: 'Sign Up', description: 'Create an account to access all features. If you already have an account, you can sign in by clicking the "try now" button', lottie: 'https://lottie.host/8ecaa103-d958-4c74-8896-5f1d50f4bf0a/68lAIlrqPH.lottie'},
    {step: 2, title: 'Find Counselors', description: 'Browse through a list of available counselors.', lottie: 'https://lottie.host/a69962bd-27f6-4d8a-be89-2c36982f9ad8/8WfL09J2WA.lottie'},
    {step: 3, title: 'Book a Session', description: 'Schedule a session with your chosen counselor.', lottie: 'https://lottie.host/d09ed02f-a1f7-4c52-a644-24ea39133c81/MPlPiwU58y.lottie'},
    {step: 4, title: 'Get Support', description: 'Attend your session and get the help you need.', lottie: 'https://lottie.host/7340bd26-35c3-44e2-8119-291d5bd733c9/QRYtImFTUZ.lottie'}
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % HOW_TO.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentStep((prev) => (prev - 1 + HOW_TO.length) % HOW_TO.length);
  };

  const goToNext = () => {
    setCurrentStep((prev) => (prev + 1) % HOW_TO.length);
  };

  return(
    <div className="main">
      <Navbar/>
      <div className="hero">
        <div className="hero-text">Easily Connect To Any Counselors!</div>
        <img src={HeroImg}/>
      </div>

      <div className="about" id="about">
        <div className="about-wrap">
          <div className="about-explanation">
            <span className="first-child">What is CounseList?</span>
            <span className="last-child">CounseList is a website to facilitate students that needs
              professional counseling services from campus, connecting them
              with available counselors without asking to 3rd person immediately!
            </span>
          </div>
          <div className="about-demo">
                <DotLottieReact
                  src="https://lottie.host/7340bd26-35c3-44e2-8119-291d5bd733c9/QRYtImFTUZ.lottie"
                  loop
                  autoplay
                  style={{ width: '800px'}}
                />
          </div>
        </div>
      </div>

      <div className="how-to" id="how-to">
        <h2 className="how-to-title">How To Use</h2>
        <div className="how-to-carousel">
          {HOW_TO.map((item, index) => {
            return (
              <div key={index} className={`how-to-item ${index === currentStep ? 'active' : ''}`}>
                <div className="howto-left">
                  <DotLottieReact
                    src={item.lottie}
                    loop
                    autoplay
                  />
                </div>
                <div className="howto-right">
                  <span className="step-number">Step {item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="how-to-controls">
          <button onClick={goToPrevious} className="control-btn">←</button>
          <div className="step-indicators">
            {HOW_TO.map((_, index) => (
              <span 
                key={index} 
                className={`indicator ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
          <button onClick={goToNext} className="control-btn">→</button>
        </div>
      </div>

      <div className="contact">
          <div className="contact-wrap" id="contact">
            <h1>Any New Requests/Help?</h1>
            <p>You can directly contact us by clicking the Whatsapp button below!</p>
            <button className="contact-btn">Contact on <FontAwesomeIcon icon={faWhatsapp}/></button>
          </div>
        </div>

        <div className="flex items-center justify-center text-xs">
            &copy; {currentYear} CounseList. All rights reserved.
        </div>
    </div>

    
  )
}

