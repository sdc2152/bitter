import React from "react";

const BannerView = ({banner, className, children}) => {
  const src = banner && banner.image;
  const styles = {
    "backgroundImage": `url(${src})`,
    "backgroundSize": "cover",
  };
  return src ?
    (
      <div className={className} style={styles}>
        {children}
      </div>
    )
    :
    (
      <div className={className}>
        {children}
      </div>
    );
};

export default BannerView;
