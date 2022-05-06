import PropTypes from 'prop-types'

export default function AdviceSlide({advice, number, total}) {
    return (
        <div className="adviceSlide fade">
            <div className="numbertext">{number} / {total}</div>
            <img src={advice.imgUrl} alt={advice.alt} />
            <div className="adviceTitle">{advice.title}</div>
            <div className="adviceText">{advice.text}</div>
        </div>
    )
}

AdviceSlide.propTypes = {
    advice: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
}