/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { PermissionsAndroid, View, Text, Button, FlatList, Share } from 'react-native';
import QRCode from 'react-native-qrcode-generator';
import ViewShot, { captureRef, captureScreen } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export default function QRCodeScreen({
  navigation,
  route: {
    params: { data }
  }
}) {
  const ref = useRef(null);
  // const [isQrGenerated, setIsQrGenerated] = useState(false);
  return (
    <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <ViewShot ref={ref}>
        <QRCode value={JSON.stringify(data)} size={125} bgColor="black" fgColor="white" />
      </ViewShot>
      <View style={{ padding: 10, width: 150 }}>
        <Button
          title="Share"
          onPress={async () => {
            const result = await captureRef(ref, {
              format: 'png',
              quality: 1
            });
            await Sharing.shareAsync(result);
          }}
        />
      </View>
    </View>
  );
}
