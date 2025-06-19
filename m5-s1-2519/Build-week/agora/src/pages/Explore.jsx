import React, { useRef, useState } from "react";
import "../styles/Explore.css";
import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";
const tabs = [
  "All",
  "Internet Culture",
  "Games",
  "Q&As & Stories",
  "Movies & TV",
  "Technology",
  "Places & Travel",
  "Pop Culture",
  "Education & Career",
];

const sections = [
  {
    title: "Recommended for you",
    communities: [
      {
        name: "pressurewashing",
        members: "47K",
        desc: "Connect with professionals and DIYers to discuss all things pressure washing.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "CleaningTips",
        members: "1.7M",
        desc: "Connect with other clean freaks and learn new ways to keep your living space spotless.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "CrappyDesign",
        members: "5.9M",
        desc: "Be amazed and horrified by the worst product and graphic designs.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "IndianGaming",
        members: "532K",
        desc: "The ultimate destination for Indian gamers. Connect and discuss from PC to console games.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "LivestreamFail",
        members: "4.1M",
        desc: "Stay entertained with the best and worst of livestreaming fails.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "RoastMe",
        members: "5.9M",
        desc: "Put your thick skin to the test and get hilariously humiliated.",
        img: "https://www.redditstatic.com/icon.png",
      },
    ],
  },
  {
    title: "Sciences",
    communities: [
      {
        name: "imaginarymaps",
        members: "499K",
        desc: "Discover fictional maps of alternate history, fantasy, and sci-fi worlds.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "fossilid",
        members: "245K",
        desc: "Get help identifying mysterious fossils from a community of experts.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "mathmemes",
        members: "562K",
        desc: "Browse and share hilarious math memes with other math enthusiasts.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "GeoPuzzle",
        members: "35K",
        desc: "This subreddit is for geography-based puzzles and location-guessing games.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "foodscience",
        members: "59K",
        desc: "Everything regarding food science and technology and the greater food industry.",
        img: "https://www.redditstatic.com/icon.png",
      },
      {
        name: "sciencememes",
        members: "3.8M",
        desc: "Laugh and learn with this community for science-related humor and memes.",
        img: "https://www.redditstatic.com/icon.png",
      },
    ],
  },
];


const INITIAL_VISIBLE = 3;
const Explore = () => {
    const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 150;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const [visibleCounts, setVisibleCounts] = useState(
    sections.map(() => INITIAL_VISIBLE)
  );

  const handleShowMore = (index) => {
    setVisibleCounts((prev) =>
      prev.map((count, i) => (i === index ? count + 3 : count))
    );
  };

  return (
    <div className="explore-page">
      <h1 className="explore-title">Explore Communities</h1>

      <div className="tabs-wrapper">
        <IoIosArrowBack className="scroll-btn left" onClick={() => scroll("left")} />
        <div className="tabs" ref={scrollRef}>
          {tabs.map((tab, index) => (
            <button key={index} className="tab-btn">{tab}</button>
          ))}
        </div>
        <IoIosArrowForward className="scroll-btn right" onClick={() => scroll("right")} />
      </div>

      <hr />

      {sections.map((section, i) => {
        const visible = visibleCounts[i];
        const showButton = visible < section.communities.length;
        return (
          <div key={i} className="section">
            <h2 className="section-title">{section.title}</h2>
            <div className="community-grid">
              {section.communities.slice(0, visible).map((com, j) => (
                <div key={j} className="community-card">
                  <img src={com.img} alt={com.name} className="community-icon" />
                  <div className="community-info">
                    <div className="top-row">
                      <h3 className="community-name">r/{com.name}</h3>
                      <button className="join-btn">Join</button>
                    </div>
                    <p className="community-members">{com.members} members</p>
                    <p className="community-desc">{com.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {showButton && (
              <div className="show-more-btn" onClick={() => handleShowMore(i)}>
                Show more
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Explore;
