import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Zoom } from "react-slideshow-image";
import styles from '../styles/ProductDetails.module.css';
import Image from "next/image"
ndev


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const images = ["https://picsum.photos/1010", "https://picsum.photos/1011", "https://picsum.photos/1220", "https://picsum.photos/1202", "https://picsum.photos/1230"];

const zoomOutProperties = {

  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 1.4,
  arrows: true
};



const Slideshow = () => {
  return (
    <div>
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
          <img key={index} style={{ width: "100%",height:'700px' }} src={each} />
        ))}
      </Zoom>
    </div>
  );
};


export default function Cara() {

  const images = ["https://picsum.photos/210", "https://picsum.photos/201", "https://picsum.photos/220", "https://picsum.photos/202", "https://picsum.photos/230"];

  return (
    <>
        <div style={{marginTop:'30px'}} >
          <Slideshow />
        </div>
        
    </>
  )
}


