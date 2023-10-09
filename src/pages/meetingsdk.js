import react, { useState } from "react";

import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

function MeetingSDK() {
  const client = ZoomMtgEmbedded.createClient();
  const url =
    "https://gwy4q3bd6h.execute-api.eu-west-2.amazonaws.com/prod/getSignature";
  const meetingId = "98872107337";
  const passcode = "824218";
  const sdkKey = "Y29Df94ZGf4xYT6pqurnf2mFL4I9xuIsqtQF";

  function getSignature(e) {
    e.preventDefault();
    const data = {
      "accountId": "zoomineer-tsa-demo-app-meeting-sdk",
      "meetingId" : meetingId,
      "role": 0
    };

    fetch(
      "https://gwy4q3bd6h.execute-api.eu-west-2.amazonaws.com/prod/getSignature",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

      },
      body: JSON.stringify(data),
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("Response For Signature", response)
        startMeeting(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature) {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button");
              },
            },
          ],
        },
      },
    });

    client.join({
      // signature: signature,
      sdkKey: sdkKey,
      meetingNumber: meetingId,
      password: passcode,
      userName: "Annonymous User",
      userEmail: "samantha.greatorex@zoomineer.com",
      tk: "",
    });
  }

  return (
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
            <h2 className="u-align-center u-text u-text-body-alt-color u-text-1"></h2>
            <p className="u-align-center u-text u-text-2">
              &nbsp;
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
      <div id="meetingSDKElement" />
    </section>
  );
}
export default MeetingSDK;
