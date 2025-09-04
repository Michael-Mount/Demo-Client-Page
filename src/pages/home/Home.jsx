import HeroVideoDemo from "../../components/feaetures/heroVideo/HeroVideoDemo";
import ImageTextSplit from "../../components/feaetures/imageTextSplit/ImageTextSplit";

import ImageSplit from "/images/image-split.png";

export default function Home() {
  return (
    <>
      <HeroVideoDemo />
      <ImageTextSplit
        image={ImageSplit}
        alt="exterior of Exeter"
        text="Intimate, warm and casually sophisticated, The Exeter Inn upholds a tradition of hospitality long vanished from today’s impersonal, chain-style hotels. At every moment, our gracious staff delights and surprises to make sure that you feel perfectly at home and well taken care of during your visit to Exeter, NH."
      />
    </>
  );
}
