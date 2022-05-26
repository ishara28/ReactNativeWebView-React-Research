import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';

export default function Home() {
  const [num1, setnum1] = React.useState();
  const [num2, setnum2] = React.useState();
  const [sum, setsum] = React.useState();

  const [recievedID, setrecievedID] = React.useState();

  function onMessage(data) {
    // alert(JSON.stringify(data));
    let num1 = JSON.parse(data.nativeEvent.data).body.num1;
    let num2 = JSON.parse(data.nativeEvent.data).body.num2;
    let sum = parseInt(num1) + parseInt(num2);
    setnum1(num1);
    setnum2(num2);
    setsum(sum);
    setrecievedID(JSON.parse(data.nativeEvent.data).id);
    let response = {
      id: JSON.parse(data.nativeEvent.data).id,
      schema: JSON.parse(data.nativeEvent.data).schema,
      status: {
        code: 200,
        message: 'OK',
      },
      body: {
        val: sum,
      },
    };
    sendDataToWebView(JSON.stringify(response));
    console.log(JSON.parse(data.nativeEvent.data));
  }

  function sendDataToWebView(response) {
    console.log(response);
    webviewRef.current.postMessage(response, '*');
  }

  const webviewRef = useRef();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#428531',
          padding: 20,
        }}>
        <Text style={{fontSize: 25, color: 'white'}}>Native App</Text>
        <Text style={{fontSize: 20, color: 'white'}}>Data from web page </Text>
        <Text style={{fontSize: 15, color: 'white'}}>ID : {recievedID} </Text>
        <Text style={{fontSize: 15, color: 'white'}}>Number 1 : {num1} </Text>
        <Text style={{fontSize: 15, color: 'white'}}>Number 2 : {num2} </Text>
        <Text style={{fontSize: 15, color: 'white'}}>Sum : {sum} </Text>
      </View>
      <WebView
        ref={webviewRef}
        scalesPageToFit={false}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        javaScriptEnabled={true}
        source={{
          uri: 'http://10.0.2.2:3000/',
        }}

        // source={{
        //   uri: 'https://a25f-123-231-85-63.in.ngrok.io',
        // }}
      />
    </SafeAreaView>
  );
}
