import "@smile_identity/smart-camera-web";
import { useLayoutEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "smart-camera-web": any;
    }
  }
}

const SmartCamera = ({
    handleImages,
    logger
    }: {
    handleImages: (images: any[]) => void;
    logger: (log: string) => void;
}) => {
  const ref = useRef<HTMLElement>(null);
  const handleImageComputed = (customEvent: any) => {
    logger("Images computed event received from smart camera component");
    console.log(customEvent.detail);
    handleImages(customEvent.detail.images);
  };
  useLayoutEffect(() => {
    logger("Smart Camera component mounted");
    const { current } = ref;

    if (current) {
      current.addEventListener("imagesComputed", handleImageComputed);
      logger("Event listener added");
    }

    return () => {
      if (current) {
        current.removeEventListener("imagesComputed", handleImageComputed);
        logger("Event listener removed");
      }
    };
  }, [ref]);

  return <smart-camera-web ref={ref}></smart-camera-web>; // Attach the ref to the web component
};

export default SmartCamera;
