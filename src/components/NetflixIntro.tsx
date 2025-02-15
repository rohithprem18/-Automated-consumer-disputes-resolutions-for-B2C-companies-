import { useEffect, useState } from 'react';

const NetflixIntro = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  if (!isPlaying) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="netflix-intro">
        <div className="netflix-n">N</div>
      </div>
    </div>
  );
};

export default NetflixIntro; 