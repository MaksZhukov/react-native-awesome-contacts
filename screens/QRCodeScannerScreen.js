/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import * as Contacts from 'expo-contacts';
import { View, StyleSheet, Text, Button, PermissionsAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCodeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [isContactSaved, setIsContactSaved] = useState(false);
  const handleBarCodeScanned = useCallback(
    res => {
      const result = JSON.parse(res.data);
      setData(result);
    },
    [setData]
  );
  useEffect(() => {
    (async () => {
      await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);
  return (
    <View style={{ display: 'flex', height: '100%' }}>
      {!data && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {data && (
        <>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 24 }}>{data.name}</Text>
            <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 24 }}>
              {data.number}
            </Text>
            <Text />
            {!isContactSaved ? (
              <Button
                title="Add to contacts"
                onPress={async () => {
                  await Contacts.addContactAsync({
                    name: data.name,
                    phoneNumbers: [{ number: data.number }]
                  });
                  setIsContactSaved(true);
                }}
              />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  padding: 5,
                  backgroundColor: 'lime'
                }}>
                Contact saved
              </Text>
            )}
          </View>
          <Button
            title="Scan QR Code again"
            onPress={() => {
              setData(null);
              setIsContactSaved(false);
            }}
          />
        </>
      )}
    </View>
  );
}
