import "./Home.css"
import { Typewriter } from "react-simple-typewriter"
/* IMPORT ICONS */
import twitterIcon from "../../assets/icons/twitter.svg"
import modelIcon from "../../assets/icons/model.svg"
import metricsIcon from "../../assets/icons/metrics.svg"
import shieldIcon from "../../assets/icons/shield.svg"

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <h1>

            <Typewriter
                words={[
                        "Hate Speech Detection",
                        "Offensive Language Detection",
                        "AI Toxicity Analyzer"
                        ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1500}/>

        </h1>

        <p className="hero-desc">
          AI powered system that detects toxic language using
          Machine Learning and Deep Learning models.
        </p>

      </section>

      <section className="features">

        <div className="feature-card glass-card">

          <img
            src={twitterIcon}
            alt="twitter dataset icon"
            className="feature-icon"
          />

          <h3>Twitter Dataset</h3>
          <p>Model trained on large scale Twitter hate speech dataset.</p>

        </div>

        <div className="feature-card glass-card">

          <img
            src={modelIcon}
            alt="model icon"
            className="feature-icon"
          />

          <h3>ML vs DL</h3>
          <p>Compare traditional machine learning and deep learning models.</p>

        </div>

        <div className="feature-card glass-card">

          <img
            src={metricsIcon}
            alt="metrics icon"
            className="feature-icon"
          />

          <h3>Performance Metrics</h3>
          <p>View accuracy, F1 score and confusion matrices.</p>

        </div>

        <div className="feature-card glass-card">

          <img
            src={shieldIcon}
            alt="shield icon"
            className="feature-icon"
          />

          <h3>Lexicon + DL</h3>
          <p>Hybrid system using lexicon and neural networks.</p>

        </div>

      </section>

    </div>
  )
}

export default Home