import React, {  } from "react";
import Carousel from 'react-bootstrap/Carousel';
import ImageOne from '../images/image1.jpg';
import ImageTwo from '../images/image2.jpg';
import ImageThree from '../images/image3.jpg';

export default function HomeCarousel() {

    const myStyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial",
        top: "80px"
      };

    return (
        <Carousel>
            <Carousel.Item interval={5000}>
            <img
                className="d-block w-100"
                src={ImageOne}
                alt="First slide"
            />
            <Carousel.Caption>
                <h2 style={myStyle}>Find a caretaker that loves your pet just as much as you do!</h2>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
            <img
                className="d-block w-100"
                src={ImageTwo}
                alt="Second slide"
            />
            <Carousel.Caption>
                <h2 style={myStyle}>7 different pet types services available</h2>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
            <img
                className="d-block w-100"
                src={ImageThree}
                alt="Third slide"
            />
            <Carousel.Caption>
                <h2 style={myStyle}>Lowest price guaranteed</h2>
            </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
