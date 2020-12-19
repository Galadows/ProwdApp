import React from 'react'
import { StyleSheet, Text, Button, TextInput, View, FlatList } from 'react-native'
import Constants from 'expo-constants'


class Chat extends React.Component{



    render(){
        return (
            <View style={styles.main_container}>
                <View style={styles.chat_container}>
                    <Text>Je suis un text</Text>
                </View>

                <View style={styles.userInput_container}>
                    <Text>Je suis un text</Text>
                </View>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex:1,
        flexDirection: 'column',
        paddingTop: Constants.statusBarHeight+3,
        backgroundColor: '#83C38D'
    },
    chat_container: {
        flex: 4
    },
    userInput_container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    }
})


export default Chat

