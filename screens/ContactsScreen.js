/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import * as Contacts from 'expo-contacts';
import { View, Text, Button, FlatList, PermissionsAndroid } from 'react-native';

// const contact = {
//   [Contacts.Fields.FirstName]: 'Bro',
//   [Contacts.Fields.LastName]: 'Bro',
//   [Contacts.Fields.PhoneNumbers]: [{ label: 'mobile', number: '(555) 555-5555' }]
// };

// (async () => {
//   try {
//     const contactId = await Contacts.addContactAsync(contact);
//     alert(`Contact id${contactId}`);
//     if (contactId) {
//       alert('Contact Saved.');
//     } else {
//       alert('Contact not saved.');
//     }
//   } catch (err) {
//     console.log(err);
//     alert('Contact not Saved', err);
//   }
// })();
export default function ContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        if (data.length > 0) {
          setContacts(data.filter(item => item.phoneNumbers).slice(0, 15));
        }
      }
    })();
  }, []);

  const renderItem = useMemo(
    () => ({ item }) => (
      <View style={{ marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>{item.name}</Text>
        <Button
          title="Generate QR"
          color="brown"
          onPress={() =>
            navigation.navigate('QRCode', {
              data: { name: item.name, number: item.phoneNumbers[0].number, id: item.id }
            })
          }
        />
      </View>
    ),
    []
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ padding: 10 }}
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View>
        <Button
          title="Scan QR Code"
          onPress={() => {
            navigation.navigate('QRCodeScanner');
          }}
        />
      </View>
    </View>
  );
}
