import Image from "next/image";
const LoadingImage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src={`https://www.images.puramas.co/Pura-cross.svg`}
        width={250}
        height={250}
        alt="loading image"
        priority
      />
    </div>
  );
};

export default LoadingImage;
