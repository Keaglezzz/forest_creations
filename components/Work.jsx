import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillMail } from "react-icons/ai";
import { motion } from "framer-motion";
import { urlFor, client } from "../lib/client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const query = '*[_type == "work"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  console.log("Work object:", works);
  return (
    <>
      <h2 className="head-text" style={{ marginTop: "1.4rem" }}>
        Welcome to <span className="head__span">Forest Creations!</span>
      </h2>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, workIndex) => (
          <div
            className={`app__work-item app__flex ${
              workIndex === expandedCard ? "expanded-card" : ""
            }`}
            key={workIndex}
          >
            <Slider {...settings}>
              {work.imgUrl && work.imgUrl.length > 0 ? (
                work.imgUrl.map((img, imgIndex) => (
                  <div key={imgIndex}>
                    <div className="app__work-img app__flex">
                      <img
                        src={urlFor(img.asset)}
                        alt={`work-${workIndex}-image-${imgIndex}`}
                      />
                      {/* rest of your code */}
                    </div>
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </Slider>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.name}</h4>
              <h6 className="bold-text" style={{ color: "#012c11" }}>
                {work.title}
              </h6>
              {workIndex === expandedCard ? (
                <p className="p-text" title={work.description}>
                  {work.description}
                </p>
              ) : (
                <p className="p-text truncated-text" title={work.description}>
                  {work.description ? work.description.substring(0, 100) : ""}
                </p>
              )}
              {work.description && work.description.length > 100 && (
                <button
                  className="expand-button"
                  onClick={() =>
                    setExpandedCard(
                      workIndex === expandedCard ? null : workIndex
                    )
                  }
                >
                  {workIndex === expandedCard ? "Read Less" : "Read More"}
                </button>
              )}
              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default Work;
