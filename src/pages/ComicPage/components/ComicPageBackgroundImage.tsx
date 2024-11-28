function ComicPageBackgroundImage({ image }: { image: string }) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="absolute top-0 left-0 right-0 w-full h-64 bg-center bg-cover z-[-1] blur-md"
    />
  );
}

export default ComicPageBackgroundImage;
