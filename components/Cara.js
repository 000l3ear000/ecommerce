import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image"


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


export default function Cara() {


    return (
    <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
  
    >
        <div style={{width:"100%",textAlign:'center',height:"800px",lineHeight:"800px",paddingTop:"100px"}}> 
          <img style={{width:"100%",height:"600px",objectFit:"cover",lineHeight:"800px"}} src="https://picsum.photos/1010"></img>
        </div>
        <div style={{width:"100%",textAlign:'center',height:"800px",lineHeight:"800px",paddingTop:"100px"}}> 
          <img style={{width:"100%",height:"600px",objectFit:"cover"}} src="https://picsum.photos/1000"></img>
        </div>
        <div style={{width:"100%",textAlign:'center',height:"800px",lineHeight:"800px",paddingTop:"100px"}}> 
          <img style={{width:"100%",height:"600px",objectFit:"cover"}} src="https://picsum.photos/1020"></img>
        </div>
        <div style={{width:"100%",textAlign:'center',height:"800px",lineHeight:"800px",paddingTop:"100px"}}> 
          <img style={{width:"100%",height:"600px",objectFit:"cover"}} src="https://picsum.photos/1030"></img>
        </div>
        <div style={{width:"100%",textAlign:'center',height:"800px",lineHeight:"800px",paddingTop:"100px"}}> 
          <img style={{width:"100%",height:"600px",objectFit:"cover"}} src="https://picsum.photos/1050"></img>
        </div>
    </Carousel>
    )
}


