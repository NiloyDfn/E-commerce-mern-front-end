interface SkeletonProps {
  length?: number;
}

const Skeleton = ({ length = 3 }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="skeleton">
          <div className="skeleton-circle"></div>
          <div className="skeleton-line"></div>
        </div>
      ))}
    </>
  );
};

export default Skeleton; 