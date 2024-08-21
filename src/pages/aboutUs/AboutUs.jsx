import "./AboutUs.css";

export const AboutUs = () => {
    return (
        <div className="about-container">
        <div className="about-content">
          <div className="title">
            <h1>100% Trusted Organic Food Store</h1>
          </div>
          <div className="principal-text">
            <p>Pellentesque a ante vulputate leo porttitor luctus sed edet eros. Nulla et
              rhoncus neque. Duis non diam eget est luctus tincidunt a a mi. Nulla eu
              eros consequat tortor tincidunt feugiat.
            </p>
          </div>
          <div className="informations-container">
            <div className="information">
              <img src="../../../images/plant-logo-2.png" />
              <div className="info-details">
                <h3>100% Organic food</h3>
                <span>100% Healthy & Fresh food</span>
              </div>
            </div>
            <div className="information">
              <img src="../../../images/bag-logo.png" />
              <div className="info-details">
                <h3>100% Sucure Payment</h3>
                <span>We ensure your money is save</span>
              </div>
            </div>
          </div>
          <div className="informations-container">
            <div className="information">
              <img src="../../../images/shipping-logo.png" />
              <div className="info-details">
                <h3>Free Shipping</h3>
                <span>Free shipping with discount</span>
              </div>    
            </div>
            <div className="information">
              <img src="../../../images/box-logo.png" />
              <div className="info-details">
                <h3>100% Organic food</h3>
                <span>100% Healthy & Fresh food.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};