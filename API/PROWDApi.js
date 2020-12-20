import React from 'react'
import { StyleSheet, Text, Button, TextInput, View, FlatList } from 'react-native'
import messages from '../Helpers/PROWDAnswer'

const AUTH_TOKEN = "53616c7465645f5f30c3fbcab5721e791de5c170251741079bc752ffed341158bbbfa3a8d3e413f32519ab3bdd2d9e73e3d8d9310094281d2aa23537720c3d8dbfcb7d59be889f82e8ccae57e8e7b0af"

export async function getChatHistory(conversation_id){
    const url = 'https://dev.beprowd.fr/webchat-history'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              auth: AUTH_TOKEN,
              conversation_id: '114548-4542457-142424-452452-webchat',
              type: "get",
              lookback: "2020-12-10T19:37:28.622Z"
            })
          }).then((response) => response.json())
          .then((json) => {
              console.log(json)
            return json
          })
          .catch((error) => {
            console.error(error);
          });
}