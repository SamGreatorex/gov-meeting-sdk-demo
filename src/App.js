import react, { useState } from "react";
import "./styles/Home.css";
import "./styles/nicepage.css";
import OmzoLogo from "./images/Omzo_Logo.png";
import GBFlag from "./images/uk.png";
import ARFlag from "./images/dubai.png";
import { Select } from "antd";
import "./i18n/config";
import { useTranslation } from "react-i18next";

function App({ Props }) {
  const { t, i18n } = useTranslation();

  // Handle language selection
  const handleLanguageChange = (value) => {
    // Implement your logic for changing the language here
    console.log(`Selected language: ${value}`);
    i18n.changeLanguage(value);
  };

  return (
    <div>
      <header className="u-clearfix u-header u-header" id="sec-cede">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <a
            href="https://nicepage.com"
            className="u-image u-logo u-image-1"
            data-image-width={150}
            data-image-height={133}
          >
            <img src={OmzoLogo} className="u-logo-image u-logo-image-1" />
          </a>
          <h1 className="u-text u-text-default u-title u-text-1">
            <span style={{ fontWeight: 700 }}>{t("header")}</span>.
          </h1>

          <div className="u-btn-1">
            <Select
              defaultValue="en" // Set the default language value
              style={{ width: 120 }} // Adjust the width as needed
              onChange={handleLanguageChange} // Handle language change event
            >
              <Select.Option key="en" value="en" defaultValue>
                <div className="language-option">
                  <img src={GBFlag} alt="English" className="language-flag" />{" "}
                  {t("language-en")}
                </div>
              </Select.Option>

              <Select.Option key="ar" value="ar">
                <div className="language-option">
                  <img src={ARFlag} alt="Arabic" className="language-flag" />{" "}
                  {t("language-ar")}
                </div>
              </Select.Option>
            </Select>
          </div>
        </div>
      </header>
      <section
        className="u-align-left u-clearfix u-container-align-left-lg u-container-align-left-xl u-image u-section-1"
        id="sec-44f4"
        data-image-width={1920}
        data-image-height={1100}
      >
        <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-sm u-valign-middle-xl u-sheet-1">
          <div
            className="u-container-align-center u-container-style u-group u-palette-1-base u-preserve-proportions u-shape-circle u-group-1"
            data-animation-name="customAnimationIn"
            data-animation-duration={1500}
          >
            <div className="u-container-layout u-valign-middle u-container-layout-1">
              <h2 className="u-align-center u-text u-text-body-alt-color u-text-1">
                {t("webinar-title")}
              </h2>
              <p className="u-align-center u-text u-text-2">
                {t("webinar-desc")}
                &nbsp;
                <br />
                <br />
              </p>
              <a
                href="https://nicepage.site"
                className="u-active-white u-align-center u-border-2 u-border-active-white u-border-hover-white u-border-white u-btn u-btn-round u-button-style u-custom-font u-font-pt-sans u-hover-white u-palette-1-base u-radius-50 u-text-active-palette-1-base u-text-hover-palette-1-base u-btn-1"
              >
                {t("webinar-join-btn")}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="u-clearfix u-white u-section-2" id="carousel_c752">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="data-layout-selected u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div
                  className="u-align-right u-container-style u-layout-cell u-size-28-lg u-size-28-xl u-size-31-md u-size-31-sm u-size-31-xs u-layout-cell-1"
                  data-animation-name="customAnimationIn"
                  data-animation-duration={1500}
                  data-animation-delay={250}
                >
                  <div className="u-container-layout u-valign-top u-container-layout-1">
                    <h3 className="u-align-left u-text u-text-1">
                      {" "}
                      {t("sustain-title")}
                    </h3>
                    <div
                      className="u-palette-1-base u-shape u-shape-circle u-shape-1"
                      data-animation-name="customAnimationIn"
                      data-animation-duration={1500}
                      data-animation-direction
                      data-animation-delay={500}
                    />
                  </div>
                </div>
                <div
                  className="u-align-justify u-container-align-left u-container-style u-layout-cell u-shape-rectangle u-size-29-md u-size-29-sm u-size-29-xs u-size-32-lg u-size-32-xl u-layout-cell-2"
                  data-animation-name="customAnimationIn"
                  data-animation-duration={1500}
                  data-animation-delay={500}
                >
                  <div className="u-container-layout u-valign-top u-container-layout-2">
                    <p className="u-align-left u-text u-text-default u-text-2">
                      {t("sustain-description")}
                    </p>
                    <a
                      href="https://nicepage.app"
                      className="u-active-palette-1-base u-align-left u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-none u-radius-50 u-text-active-white u-text-hover-white u-btn-1"
                    >
                      {t("read-more-btn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="u-align-center u-clearfix u-container-align-center u-palette-1-base u-section-3"
        id="carousel_0f3d"
      >
        <div className="u-clearfix u-sheet u-sheet-1">
          <h2
            className="u-align-center u-text u-text-body-alt-color u-text-default u-text-1"
            data-animation-name="customAnimationIn"
            data-animation-duration={1500}
            data-animation-delay={0}
          >
            {" "}
            {t("sustain-projects-title")}
          </h2>
          <div className="u-expanded-width u-list u-list-1">
            <div className="u-repeater u-repeater-1">
              <div
                className="u-align-center u-container-align-left u-container-style u-list-item u-radius-19 u-repeater-item u-shape-round u-white u-list-item-1"
                data-animation-direction="Up"
                data-animation-name="customAnimationIn"
                data-animation-duration={1500}
                data-animation-delay={500}
              >
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1">
                  <h4 className="u-align-left u-text u-text-2">
                    {" "}
                    {t("cchange-title")}
                  </h4>
                  <p className="u-align-left u-text u-text-3">
                    <span className="u-file-icon u-icon u-text-palette-3-base u-icon-1">
                      <img src="images/3177361-e391aca0.png" alt="" />
                    </span>{" "}
                    {t("cchange-subtitle")}
                  </p>
                  <p className="u-align-left u-text u-text-4">
                    {" "}
                    {t("cchange-desc")}{" "}
                  </p>
                  <a
                    href="https://nicepage.cc"
                    className="u-align-left u-border-1 u-border-active-palette-1-base u-border-grey-50 u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-bottom-left-radius-0 u-bottom-right-radius-0 u-btn u-button-style u-none u-radius-0 u-text-active-palette-1-base u-text-hover-palette-1-base u-text-palette-1-base u-top-left-radius-0 u-top-right-radius-0 u-btn-1"
                  >
                    {t("learn-more-btn")}
                  </a>
                  <img
                    className="u-expanded-width u-image u-image-round u-preserve-proportions u-radius-20 u-image-1"
                    src="images/767.jpg"
                    alt=""
                    data-image-width={800}
                    data-image-height={533}
                  />
                </div>
              </div>
              <div
                className="u-align-center u-container-align-left u-container-style u-list-item u-radius-19 u-repeater-item u-shape-round u-white u-list-item-2"
                data-animation-name="customAnimationIn"
                data-animation-duration={1500}
                data-animation-delay={500}
              >
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                  <h4 className="u-align-left u-text u-text-5">
                    {" "}
                    {t("urban-title")}
                  </h4>
                  <p className="u-align-left u-text u-text-6">
                    <span className="u-file-icon u-icon u-text-palette-3-base u-icon-2">
                      <img src="images/3177361-e391aca0.png" alt="" />
                    </span>{" "}
                    {t("urban-subtitle")}
                  </p>
                  <p className="u-align-left u-text u-text-7">
                    {" "}
                    {t("urban-desc")}{" "}
                  </p>
                  <a
                    href="https://nicepage.cc"
                    className="u-align-left u-border-1 u-border-active-palette-1-base u-border-grey-50 u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-bottom-left-radius-0 u-bottom-right-radius-0 u-btn u-button-style u-none u-radius-0 u-text-active-palette-1-base u-text-hover-palette-1-base u-text-palette-1-base u-top-left-radius-0 u-top-right-radius-0 u-btn-2"
                  >
                    {t("learn-more-btn")}
                  </a>
                  <img
                    className="u-expanded-width u-image u-image-round u-preserve-proportions u-radius-20 u-image-2"
                    src="images/building.jpg"
                    alt=""
                    data-image-width={626}
                    data-image-height={418}
                  />
                </div>
              </div>
              <div
                className="u-align-center u-container-align-left u-container-style u-list-item u-radius-19 u-repeater-item u-shape-round u-video-cover u-white u-list-item-3"
                data-animation-direction="Up"
                data-animation-name="customAnimationIn"
                data-animation-duration={1500}
                data-animation-delay={500}
              >
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3">
                  <h4 className="u-align-left u-text u-text-8">
                    {" "}
                    {t("house-title")}
                  </h4>
                  <p className="u-align-left u-text u-text-9">
                    <span className="u-file-icon u-icon u-text-palette-3-base u-icon-3">
                      <img src="images/3177361-e391aca0.png" alt="" />
                    </span>{" "}
                    {t("house-subtitle")}
                  </p>
                  <p className="u-align-left u-text u-text-10">
                    {" "}
                    {t("house-desc")}{" "}
                  </p>
                  <a
                    href="https://nicepage.cc"
                    className="u-align-left u-border-1 u-border-active-palette-1-base u-border-grey-50 u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-bottom-left-radius-0 u-bottom-right-radius-0 u-btn u-button-style u-none u-radius-0 u-text-active-palette-1-base u-text-hover-palette-1-base u-text-palette-1-base u-top-left-radius-0 u-top-right-radius-0 u-btn-3"
                  >
                    {t("learn-more-btn")}
                  </a>
                  <img
                    className="u-expanded-width u-image u-image-round u-preserve-proportions u-radius-20 u-image-3"
                    src="images/64.jpg"
                    alt=""
                    data-image-width={1380}
                    data-image-height={920}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer
        className="u-align-center u-clearfix u-footer u-grey-80 u-footer"
        id="sec-d9e6"
      >
        <div className="u-clearfix u-sheet u-sheet-1">
          <p className="u-small-text u-text u-text-variant u-text-1">
            {t("contact-here")}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
