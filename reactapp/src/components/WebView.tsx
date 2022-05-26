import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CRow,
  CSpinner,
} from "@coreui/react";
import axios from "axios";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { BACKEND_URL } from "../Constants";

declare const window: any;

function WebView() {
  const [num1, setnum1] = React.useState(0);
  const [num2, setnum2] = React.useState(0);

  const [num1API1, setnum1API1] = React.useState(0);
  const [num2API1, setnum2API1] = React.useState(0);
  const [num1API2, setnum1API2] = React.useState(0);
  const [num2API2, setnum2API2] = React.useState(0);

  const [uid1, setuid1] = React.useState();
  const [uid2, setuid2] = React.useState();

  const [responseone, setresponseone] = React.useState();
  const [responsetwo, setresponsetwo] = React.useState();

  const [isFetchedAPI1, setisFetchedAPI1] = React.useState(true);
  const [isFetchedAPI2, setisFetchedAPI2] = React.useState(true);

  const [fetchedIdAPI1, setfetchedIdAPI1] = React.useState();
  const [fetchedIdAPI2, setfetchedIdAPI2] = React.useState();

  const [fetchedSumAPI1, setfetchedSumAPI1] = React.useState();
  const [fetchedSumAPI2, setfetchedSumAPI2] = React.useState();

  React.useEffect(() => {
    document.addEventListener("message", (message: any) => {
      if (JSON.parse(message.data).schema == "v1") {
        setisFetchedAPI1(true);
        setresponseone(JSON.parse(message.data));
        setfetchedIdAPI1(JSON.parse(message.data).id);
        setfetchedSumAPI1(JSON.parse(message.data).body.val);
      } else {
        setisFetchedAPI2(true);
        setresponsetwo(JSON.parse(message.data));
        setfetchedIdAPI2(JSON.parse(message.data).id);
        setfetchedSumAPI2(JSON.parse(message.data).body.val);
      }
    });
  });

  const sendDataToReactNativeApp = async (api: string) => {
    let uid: any = uuidv4();
    if (api == "api1") {
      setisFetchedAPI1(false);
      setuid1(uid.substring(uid.length - 8));
      setnum1API1(num1);
      setnum2API1(num2);
    } else if (api == "api2") {
      setisFetchedAPI2(false);
      setnum1API2(num1);
      setnum2API2(num2);
      setuid2(uid.substring(uid.length - 8));
    }
    const responseAPI = await getDatafromAPI(
      uid.substring(uid.length - 8),
      api
    );

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(responseAPI));
    }
  };

  const getDatafromAPI = async (id: String, api: string) => {
    const response: any = await axios.post(
      BACKEND_URL + "/testapi/" + api + "/" + id,
      {
        num1: num1,
        num2: num2,
      }
    );

    return response.data;
  };

  return (
    <CContainer style={{ padding: 10, textAlign: "center" }}>
      <h2 style={{ textAlign: "center" }}>Web Page</h2>

      <CRow>
        <CCol>
          <CFormInput
            type="number"
            size="sm"
            placeholder="Number 1"
            aria-label="lg input example"
            value={num1}
            onChange={(e) => setnum1(parseInt(e.target.value))}
          />
        </CCol>
        <CCol>
          <CFormInput
            type="number"
            size="sm"
            placeholder="Number 2"
            aria-label="lg input example"
            value={num2}
            onChange={(e) => setnum2(parseInt(e.target.value))}
          />
        </CCol>
      </CRow>
      <br />
      <CRow>
        <CButton
          color="primary"
          onClick={() => sendDataToReactNativeApp("api1")}
        >
          Request 1
        </CButton>
        <br />
        <h4>Request</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "100vh",
          }}
        >
          id : {uid1} <br />
          Num 1 : {num1API1} <br />
          Num 2 : {num2API1}
        </div>
        <h4>Response</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isFetchedAPI1 && <CSpinner />}
          {isFetchedAPI1 && (
            <div>
              id : {fetchedIdAPI1} <br />
              sum : {fetchedSumAPI1}
            </div>
          )}
        </div>
        <CButton color="dark" onClick={() => sendDataToReactNativeApp("api2")}>
          Request 2
        </CButton>
        <br />
        <h4>Request</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          id : {uid2} <br />
          Num 1 : {num1API2} <br />
          Num 2 : {num2API2}
        </div>

        <h4>Response</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isFetchedAPI2 && <CSpinner />}
          {isFetchedAPI2 && (
            <div>
              id : {fetchedIdAPI2} <br />
              sum : {fetchedSumAPI2}
            </div>
          )}
        </div>
      </CRow>
    </CContainer>
  );
}

export default WebView;
