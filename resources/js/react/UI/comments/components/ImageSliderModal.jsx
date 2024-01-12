import React, { useEffect, useState } from "react";
import ImagesModalContainer from "../utils/ImagesModalContainer";
import style from "../styles/comments.module.css";
import {
    IoIosArrowBack,
    IoIosArrowForward,
    IoMdCloseCircle,
} from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useCommentContext } from "../CommentsBody";
import getImageList from "../utils/getImageList";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../styles/modalSlider.css";

// import required modules
import {
    Zoom,
    FreeMode,
    Navigation,
    Thumbs,
    HashNavigation,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ImageSliderModal = ({
    isOpen,
    close,
    selectedImgUrl,
    setSelectedImgUrl,
}) => {
    const { allComments } = useCommentContext();
    const [imgFileList, setImageFileList] = useState([]);

    useEffect(() => {
        if (allComments) {
            setImageFileList(getImageList(allComments));
        }
    }, [allComments]);

    return (
        <ImagesModalContainer isOpen={isOpen}>
            {isOpen && allComments.length && selectedImgUrl ? (
                <div
                    className={`${style.image_slide_modal_container} slider-parent`}
                >
                    <IoMdCloseCircle
                        className={`${style.image_slide_modal_container__close_btn}`}
                        onClick={close}
                    />
                    <ImageSlider
                        imgFileList={imgFileList || []}
                        targetIndex={imgFileList.findIndex((comment) => {
                            return comment?.url === selectedImgUrl;
                        })}
                    />
                </div>
            ) : (
                <></>
            )}
        </ImagesModalContainer>
    );
};

export default ImageSliderModal;

// const CustomPrevArrow = ({ className, style, onClick })=>{
//     return (
//         <IoIosArrowBack
//             className={className}
//             style={{ ...style, display: "block" }}
//             onClick={onClick}
//         />
//     );
// }

// const CustomNextArrow = ({ className, style, onClick })=>{
//     return (
//         <IoIosArrowForward
//             className={className}
//             style={{ ...style, display: "block" }}
//             onClick={onClick}
//         />
//     );
// }

// const ImageSlider = () => {
//     const {
//         allComments,
//         imageModalCurrentFileUrl,
//         setImageModalCurrentFileUrl,
//     } = useCommentContext();
//     const [imgFileList, setImageFileList] = useState([]);

//     useEffect(() => {
//         setImageFileList(getImageList(allComments));
//     }, [allComments]);

//     useEffect(() => {
//         [...imgFileList].findIndex((img) => {
//             console.log({ url: img.url, imageModalCurrentFileUrl });
//             return img.url === imageModalCurrentFileUrl;
//         });
//     }, [imgFileList]);

//     const settings = {
//         customPaging: function (i) {
//             return (
//                 <a>
//                     <img
//                         style={
//                             {
//                                 // height:"10vh",
//                                 // width:"auto",
//                                 // minWidth:"none",
//                                 // maxWidth:"auto"
//                             }
//                         }
//                         src={`${[...imgFileList][i].url}`}
//                     />
//                 </a>
//             );
//         },
//         dots: true,
//         dotsClass: "slick-dots slick-thumb",
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         className: `${style.image_slide_modal_container__slider}`,
//         initialSlide: [...imgFileList].findIndex((img) => {
//             return img.url === imageModalCurrentFileUrl;
//         }),
//         arrows: true,
//         prevArrow: <CustomPrevArrow />,
//         nextArrow: <CustomNextArrow />,
//     };
//     return (
//         <Slider {...settings}>
//             {[...imgFileList].map((img, i) => {
//                 return (
//                     <div
//                         className={`${style.image_slide_modal_container__slider_container}`}
//                         key={i}
//                     >
//                         <img
//                             className={`${style.image_slide_modal_container__slider_image}`}
//                             src={img.url}
//                         />
//                     </div>
//                 );
//             })}
//         </Slider>
//     );
// };

const ImageSlider = ({ imgFileList = [], targetIndex }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(targetIndex);

    useEffect(() => {
        document
            .querySelectorAll(".mySwiper .swiper-slide")
            .forEach((child) => {
                child.style.width = "auto";
                // child.style.maxWidth = "250px";
                // child.style.height = "auto";
                child.style.marginRight = "0";
            });
    }, []);

    const handleSetTarget = (i) => {
        setActiveIndex(i);
    };

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={0}
                navigation={true}
                thumbs={{
                    swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                }}
                modules={[Zoom, FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
                fadeEffect={{ crossFade: true }}
                initialSlide={targetIndex}
                zoom={true}
            >
                {[...imgFileList].map((img, i) => {
                    return (
                        <SwiperSlide key={i}>
                            {({ isActive }) => {
                                if (isActive) {
                                    // console.log("index :", i);
                                    handleSetTarget(i);
                                }
                                return (
                                    <div className="swiper-zoom-container swiper-zoom-container-img">
                                        <img
                                            className="slider__image"
                                            src={img.url}
                                        />
                                    </div>
                                );
                            }}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className="mySwiper_container">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={0}
                    slidesPerView={[...imgFileList].length<4?[...imgFileList].length:4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                    initialSlide={targetIndex}
                >
                    {[...imgFileList].map((img, i) => {
                        return (
                            <SwiperSlide
                                style={{
                                    width: "auto",
                                    height: "100%",
                                }}
                                key={`thumb_${i}`}
                            >
                                <img
                                    className={`slider__thumb ${
                                        activeIndex === i
                                            ? "slider__thumb_active"
                                            : ""
                                    }`}
                                    src={img.url}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </>
    );
};
