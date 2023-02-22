// ** react
import React, {useState} from 'react'

// ** slick slide
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CustomSlide = (props) => {
  // ** props
  const itemValue = props.item

  // ** state
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive(!active)
  }

  return (
    <div className="slide-contents">
      <h4 className="slide-contents__title">{itemValue.english}</h4>
      <div className={`slide-contents__text ${active ? 'active' : ''}`}
           onClick={() => handleToggle()}>
        <p className="slide-contents__meaning">{itemValue.korean}</p>
        <p className="slide-contents__explanation">{itemValue.explanation}</p>
      </div>
    </div>
  )
}

const SlickSlider = (props) => {
  const words = props.words

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className="slide-wrap">
      <Slider {...settings}>
        {
          words ?
            words.map((item) => {
              return <CustomSlide item={item}/>
            }) : <></>
        }
      </Slider>
    </div>
  )
}

export default SlickSlider