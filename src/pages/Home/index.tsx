import { lazy, Suspense, useContext, useEffect, useRef } from "react";
import Clarity from "@microsoft/clarity";
import { AppContext } from "../../context/AppContext"
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ContactContent from "../../content/ContactContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const galleryItems = MiddleBlockContent.galleryItems.sort(()=>Math.random() - .8);
const Home = () => {
  Clarity.init("wisod5y80f");
  const { setContextData } = useContext(AppContext);

  const middleRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const inViewRef = useRef("intro");
  useEffect(()=>{
    let ticking = false;
    const handleChange = () => {
      if (!ticking){
        requestAnimationFrame(()=>{
          if (middleRef.current && missionRef.current && aboutRef.current) {
            let midCHeight = middleRef.current.clientHeight;
            let misCHeight = missionRef.current.clientHeight;
            let abtCHeight = aboutRef.current.clientHeight-165;

            let totalHeight = midCHeight + misCHeight + abtCHeight;
            let offsetTop = middleRef.current.offsetTop-150;
            let next = "intro";
            switch (true) {
              case(window.scrollY > offsetTop && window.scrollY < (midCHeight+offsetTop)):
                next = 'middle';
                break;
              case(window.scrollY > (offsetTop+midCHeight) && window.scrollY < ((totalHeight+offsetTop)-abtCHeight)):
                next = 'mission';
                break;
              case(window.scrollY > (offsetTop+midCHeight+misCHeight) && window.scrollY < (totalHeight+offsetTop)):
                next = 'about';
                break;
              default:
                next = "";
            }
            // 🔑 ONLY update if changed
            if (inViewRef.current !== next) {
              inViewRef.current = next;
              setContextData({ inViewId: next });
            }
          }
          ticking = false;
        });
        ticking = true;
        }
    }

    window.addEventListener("scroll", handleChange);
    window.addEventListener("resize", handleChange);
    handleChange();

    return ()=>{
      window.removeEventListener("scroll", handleChange);
      window.removeEventListener("resize", handleChange);
    }
  }, [setContextData])

  return (
    <Suspense fallback={null}>
      <Container>
        <ScrollToTop />
        <ContentBlock
          direction="right"
          title={IntroContent.title}
          content={IntroContent.text}
          button={IntroContent.button}
          icon="developer.svg"
          image="hero-illustration-f5.jpg"
          id="intro"
          ref={null}
        />
        <MiddleBlock
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          button={MiddleBlockContent.button}
          galleryItems={galleryItems}
          id="middle"
          ref={middleRef}
        />
        <ContentBlock
          direction="right"
          title={MissionContent.title}
          content={MissionContent.text}
          skills={MissionContent.skills}
          github={MissionContent.github}
          cloudIcons={MissionContent.cloudIcons}
          icon="product-launch.svg"
          image="rocket.png"
          id="mission"
          ref={missionRef}
        />
        <ContentBlock
          direction="left"
          title={AboutContent.title}
          content={AboutContent.text}
          content2={AboutContent.text2}
          section={AboutContent.section}
          icon="graphs.svg"
          image="dev-photo.png"
          id="about"
          ref={aboutRef}
        />
        <Contact
          title={ContactContent.title}
          content={ContactContent.text}
          id="contact"
          ref={null}
        />
      </Container>
    </Suspense>
  );
};

export default Home;
