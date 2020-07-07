/**
 * Created by sanchitgupta001 on 22/06/2020
 */
import { useEffect, useState } from 'react';

const useProgressiveLoadingImage = (source) => {
  const [isImgSrcLoading, setIsImgSrcLoading] = useState(!!source);

  useEffect(() => {
    if (isImgSrcLoading) {
      const img = new Image();

      img.onload = () => {
        setIsImgSrcLoading(false);
      };
      img.src = source;
    }
  }, [source, isImgSrcLoading]);

  return isImgSrcLoading ? undefined : source;
};

export default useProgressiveLoadingImage;
