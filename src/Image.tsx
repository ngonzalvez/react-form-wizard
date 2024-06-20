import { FC } from "react";

export interface ImageConfig {
  key: string;
  type: "image";
  src: string;
  className?: string;
  alt: string;
  label?: string;
}

interface ImageProps {
  config: ImageConfig;
}

const Image: FC<ImageProps> = ({ config }) => {
  return <img src={config.src} alt={config.alt} className={config.className} />;
};

export default Image;
