/**
 * Created by sanchitgupta001 on 22/06/2020
 */
import React, { useMemo } from 'react';

// hooks
import useProgressiveLoadingImage from './hooks/useProgressiveLoadingImage';

const DEFAULT_FALLBACK_STYLES = {
  backgroundColor: '#d7d7e0',
  width: '100%',
  height: '100%',
};

function DefaultFallbackImg({ styles }) {
  const updatedStyles = useMemo(
    () => ({ ...DEFAULT_FALLBACK_STYLES, styles }),
    [styles]
  );

  return <div style={updatedStyles} />;
}

function WithImgFallback({ source, children, styles, fallbackImgRenderer }) {
  const ImgFallback = fallbackImgRenderer;

  return source ? children : <ImgFallback style={styles} />;
}

WithImgFallback.defaultProps = {
  fallbackImgRenderer: DefaultFallbackImg,
};

function Photo({
  className,
  source,
  isBgImage,
  styles,
  onLoad,
  fallbackImgRenderer,
  fallbackStyles,
}) {
  const loadedSource = useProgressiveLoadingImage(source);

  return (
    <WithImgFallback
      source={loadedSource}
      fallbackImgRenderer={fallbackImgRenderer}
      styles={fallbackStyles}
    >
      {isBgImage ? (
        <div
          className={className}
          style={{
            backgroundImage: `url("${loadedSource}")`,
            ...styles,
          }}
        />
      ) : (
        <img
          className={className}
          style={styles}
          src={loadedSource}
          onLoad={onLoad}
        />
      )}
    </WithImgFallback>
  );
}

export default Photo;
