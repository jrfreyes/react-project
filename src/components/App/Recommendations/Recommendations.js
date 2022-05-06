import { useEffect, useState } from 'react'
import AdviceSlide from './AdviceSlide'
import './Recommendations.css'
import sampleRecommendations from './sampleRecommendations.json'


export default function Recommendations() {
    const [adviceNumber, setAdviceNumber] = useState(1);
    const [advices, setAdvices] = useState(sampleRecommendations);
    const [currentAdvice, setCurrentAdvice] = useState(advices[adviceNumber-1])
    const [waiting, setWaiting] = useState(false);

    const traverseSlides = (direction) => {
        let nextAdviceNumber = (adviceNumber + direction) 
        if (nextAdviceNumber <= 0)
        {
            nextAdviceNumber += advices.length
        } else {
            nextAdviceNumber = ((nextAdviceNumber - 1) % advices.length) + 1
        }
        setAdviceNumber(nextAdviceNumber);
    }


    const handleKeyDown = ({key}) => {
        if (waiting) {
            return
        }
        if (key === "ArrowRight") {
            traverseSlides(1)
        } if (key === "ArrowLeft") {
            traverseSlides(-1)
        }
        setWaiting(true)
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    })

    useEffect(() => {
        let timeout;
        if (waiting) {
            timeout = setTimeout(() => setWaiting(false), 500)
        }

        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [waiting])

    useEffect(() => {
        setCurrentAdvice(advices[adviceNumber-1]);
    }, [adviceNumber])

    useEffect(() => {
        const interval = setInterval(() => traverseSlides(1), 5000)

        return () => {
            clearInterval(interval)
        }
    })

    return (
        <div className="Recommendations">
            <div className="slideshow-container">
            
            <AdviceSlide
                advice={currentAdvice}
                number={adviceNumber}
                total={advices.length}
            />

            <a className="prev" onClick={() => traverseSlides(-1)}>❮</a>
            <a className="next" onClick={() => traverseSlides(1)}>❯</a>

            </div>
            <br />

            <div style={{'textAlign':'center'}}>
                {[...Array(advices.length).keys()].map((i) => (
                    <span 
                        key={i} 
                        className={i+1 === adviceNumber ? 'dot active' : 'dot'} 
                        onClick={() => setAdviceNumber(i+1)} 
                    />
                ))}
            </div>

        </div>
    )
}