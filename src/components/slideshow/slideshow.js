import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {is_null} from "../../app/tool";

const CarouselItem = ({newPiece, is_active}) => {


    const linkUrl = "/newdetail/" + newPiece.id
    const linkClass = is_active ? "carousel-item active" : "carousel-item"
    console.log(linkUrl)
    return <Link to={{pathname: linkUrl}}
                 className={linkClass}>
        <picture>
            <source srcSet= {newPiece.image.contentUrl}/>
            <img src={newPiece.image.thumbnail.contentUrl} className="d-block w-100"
                 style={{"height": "25rem"}}/>
        </picture>
        <div className="carousel-caption d-none d-md-block">
            <p>{newPiece.name}</p>
        </div>
    </Link>

}

const SlideShow = () => {
    const news = useSelector(state => state.news.data.list)

    is_null(news)

    return (

            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {news.map((piece, index) => {
                      return <CarouselItem newPiece={piece} is_active={index === 0} key={index} />
                    })}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
    )
}

export default SlideShow