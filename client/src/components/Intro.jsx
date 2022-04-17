import {
  Container,
  IntroLeft,
  Image,
  IntroRight,
  IntroTitle,
  IntroDesc,
} from "../styles/Intro.styles";
import baner from "../img/baner.png";

const Intro = () => {
  return (
    <Container>
      <IntroLeft>
        <Image src={baner} />
      </IntroLeft>
      <IntroRight>
        <IntroTitle>Millions of student &amp; making interections</IntroTitle>
        <IntroDesc>
          An online platform that connects the world's students &amp; teachers
        </IntroDesc>
      </IntroRight>
    </Container>
  );
};

export default Intro;
