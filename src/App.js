import react, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Home.css";
import "./styles/nicepage.css";
import OmzoLogo from "./images/Omzo_Logo.png";
import GBFlag from "./images/uk.png";
import ARFlag from "./images/dubai.png";
import { Select, Button, Modal, Form, Input, Row } from "antd";
import "./i18n/config";
import { useTranslation } from "react-i18next";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import KJUR from "jsrsasign";

function App() {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingJoining, setMeetingJoining] = useState(false);
  const [form] = Form.useForm();

  const client = ZoomMtgEmbedded.createClient();
  const sdkKey = process.env.REACT_APP_SDK_KEY;
  const sdkSecret = process.env.REACT_APP_SDK_SECRET;
  const userId = "Annonymous User";
  let meetingId = "";
  let passcode = "";

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client
      .init({
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        customize: {
          video: {
            popper: {
              disableDraggable: true,
            },
            viewSizes: {
              default: {
                width: 800,
                height: 600,
              },
            },
          },
        },
      })
      .then((data) => {
        console.log(data);
      });

    setInterval(function () {
      checkMeetingStatus();
    }, 3000);
  };
  // Handle language selection
  const handleLanguageChange = (value) => {
    // Implement your logic for changing the language here
    console.log(`Selected language: ${value}`);
    i18n.changeLanguage(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (items) => {
    setIsModalOpen(false);
    sessionStorage.setItem("webinarId", items.webinarId);
    sessionStorage.setItem("webinarPasscode", items.webinarpc);
    console.log("items", items);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  async function handleJoinMeeting(e) {
    console.log("Joining Meeting", sdkKey, sdkSecret);
    e.preventDefault();
    meetingId = sessionStorage.getItem("webinarId");
    passcode = sessionStorage.getItem("webinarPasscode");

    const data = {
      accountId: "zoomineer-tsa-demo-app-meeting-sdk",
      meetingId: meetingId,
      role: 0,
      userId: userId,
    };
    const signature = await getSignature();
    startMeeting(signature);
  }

  function startMeeting(signature) {
    try {
      client
        .join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingId,
          password: passcode,
          userName: "demo.user@zoom.us",
          userEmail: "demo.user@zoom.us",
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } catch (error) {
      console.log("Error Joining meeting", error);
    }
  }

  const checkMeetingStatus = () => {
    const status = client.getCurrentMeetingInfo();
    setMeetingJoining(status.meetingNumber !== 0);
  };

  const getSignature = async () => {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
    const oHeader = { alg: "HS256", typ: "JWT" };

    const oPayload = {
      sdkKey: sdkKey,
      appKey: sdkKey,
      mn: meetingId,
      role: 0,
      iat: iat,
      exp: exp,
      tokenExp: exp,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);

    console.log("Returning", sdkJWT);
    return sdkJWT;
  };

  return (
    <div>
      <header className="u-clearfix u-header u-header" id="sec-cede">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="u-image u-logo u-image-1">
            <img src={OmzoLogo} className="u-logo-image u-logo-image-1" />
          </div>
          <h1 className="u-text u-text-default u-title u-text-1">
            <span style={{ fontWeight: 700 }}>{t("header")}</span>
          </h1>

          <div className="u-btn-1">
            <Select
              defaultValue="en" // Set the default language value
              style={{ width: 70 }} // Adjust the width as needed
              onChange={handleLanguageChange} // Handle language change event
            >
              <Select.Option key="en" value="en" defaultValue>
                <div className="language-option">
                  <img src={GBFlag} alt="English" className="language-flag" />
                </div>
              </Select.Option>

              <Select.Option key="ar" value="ar">
                <div className="language-option">
                  <img src={ARFlag} alt="Arabic" className="language-flag" />
                </div>
              </Select.Option>
            </Select>
          </div>
        </div>
      </header>
      <Row className="u-section-1">
        {/* Circle Image */}
        {!meetingJoining && (
          <div className="u-circle-shape">
            <div className="u-text-1">{t("webinar-title")}</div>
            <p className="u-text-1">{t("webinar-desc")}</p>
            <a onClick={handleJoinMeeting} className="u-border-2 u-border-white   u-hover-white u-palette-1-base u-radius-50 u-text-active-palette-1-base u-text-hover-palette-1-base u-btn-1">
              {t("webinar-join-btn")}
            </a>
          </div>
        )}
        <div id="meetingSDKElement"></div>
      </Row>

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
                    <h3 className="u-align-left u-text u-text-1"> {t("sustain-title")}</h3>
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
                    <p className="u-align-left u-text u-text-default u-text-2">{t("sustain-description")}</p>
                    <a
                      href="https://events.zoom.us/ev/Ar-FITQfhJ_n3IblupsGuBZCd_jF1cumEV4n-fB2bnCDTLpSRhUE~AovXEp_tjv5RdIqZCI_XrXdNjlLA1O7gRFx6_239WiIxJCZ-_VdVvHFLAg"
                      target="blank"
                      className="u-active-palette-1-base u-align-left u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-none u-radius-50 u-text-active-white u-text-hover-white u-btn-1"
                    >
                      {t("register-now-btn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="u-align-center u-clearfix u-container-align-center u-palette-1-base u-section-3" id="carousel_0f3d">
        <div className="u-clearfix u-sheet u-sheet-1">
          <h2 className="u-align-center u-text u-text-body-alt-color u-text-default u-text-1" data-animation-name="customAnimationIn" data-animation-duration={1500} data-animation-delay={0}>
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
                  <h4 className="u-align-left u-text u-text-2">{t("cchange-title")}</h4>
                  <p className="u-align-left u-text u-text-3">
                    <span className="u-file-icon u-icon u-text-palette-3-base u-icon-1">
                      <img src="images/3177361-e391aca0.png" alt="" />
                    </span>{" "}
                    {t("cchange-subtitle")}
                  </p>
                  <p className="u-align-left u-text u-text-4"> {t("cchange-desc")} </p>
                  <a
                    href="https://nicepage.cc"
                    className="u-align-left u-border-1 u-border-active-palette-1-base u-border-grey-50 u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-bottom-left-radius-0 u-bottom-right-radius-0 u-btn u-button-style u-none u-radius-0 u-text-active-palette-1-base u-text-hover-palette-1-base u-text-palette-1-base u-top-left-radius-0 u-top-right-radius-0 u-btn-1"
                  >
                    {t("learn-more-btn")}
                  </a>
                  <img className="u-expanded-width u-image u-image-round u-preserve-proportions u-radius-20 u-image-1" src="images/767.jpg" alt="" data-image-width={800} data-image-height={533} />
                </div>
              </div>
              <div
                className="u-align-center u-container-align-left u-container-style u-list-item u-radius-19 u-repeater-item u-shape-round u-white u-list-item-2"
                data-animation-name="customAnimationIn"
                data-animation-duration={1500}
                data-animation-delay={500}
              >
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                  <h4 className="u-align-left u-text u-text-5"> {t("urban-title")}</h4>
                  <p className="u-align-left u-text u-text-6">
                    <span className="u-file-icon u-icon u-text-palette-3-base u-icon-2">
                      <img src="images/3177361-e391aca0.png" alt="" />
                    </span>{" "}
                    {t("urban-subtitle")}
                  </p>
                  <p className="u-align-left u-text u-text-7"> {t("urban-desc")} </p>
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
                  <h4 className="u-align-left u-text u-text-8"> {t("house-title")}</h4>
                  <p className="u-align-left u-text u-text-9">
                    <span className="u-file-icon u-icon u-text-palette-3-base u-icon-3">
                      <img src="images/3177361-e391aca0.png" alt="" />
                    </span>{" "}
                    {t("house-subtitle")}
                  </p>
                  <p className="u-align-left u-text u-text-10"> {t("house-desc")} </p>
                  <a
                    href="https://nicepage.cc"
                    className="u-align-left u-border-1 u-border-active-palette-1-base u-border-grey-50 u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-bottom-left-radius-0 u-bottom-right-radius-0 u-btn u-button-style u-none u-radius-0 u-text-active-palette-1-base u-text-hover-palette-1-base u-text-palette-1-base u-top-left-radius-0 u-top-right-radius-0 u-btn-3"
                  >
                    {t("learn-more-btn")}
                  </a>
                  <img className="u-expanded-width u-image u-image-round u-preserve-proportions u-radius-20 u-image-3" src="images/64.jpg" alt="" data-image-width={1380} data-image-height={920} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-d9e6">
        <div className="u-clearfix u-sheet u-sheet-1">
          <p className="u-small-text u-text u-text-variant u-text-1">{t("contact-here")}</p>
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
          <Modal
            open={isModalOpen}
            title="Set Webinar Details"
            okText="Create"
            cancelText="Cancel"
            onCancel={handleCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  handleOk(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
            >
              <Form.Item
                name="webinarId"
                label="Webinar ID"
                rules={[
                  {
                    required: true,
                    message: "Please input the webinar ID!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="webinarpc"
                label="Webinar Passcode"
                rules={[
                  {
                    required: true,
                    message: "Please input the webinar Passcode!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="username"
                label="Authentication Username"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value === "Admin") {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("Please input a valid username to authenticate the settings");
                      }
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Authentication Password"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value === "Gitex23!") {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("Please input a valid password to authenticate the settings");
                      }
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </footer>
    </div>
  );
}
export default App;
