import React from 'react'
import { StyleSheet, Text, Button, TextInput, View, FlatList } from 'react-native'
import Constants from 'expo-constants'
import messages from '../Helpers/PROWDAnswer'
import Message from './Message'
import uuid from 'uuid-random'


class Chat extends React.Component{

    _getMessageType(obj_message){
        return obj_message.type
    }
    

    render(){
        //console.log(messages)
        return (
            <View style={styles.main_container}>
                <View style={styles.chat_container}>
                <FlatList
                    style={styles.message_list}
                    data={Object.keys(messages)}
                    keyExtractor={(item) => uuid()}
                    renderItem={({item}) => <Message message={messages[item]} type={this._getMessageType(messages[item])} /> }
                />
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
        flex: 4,
        margin: 1
    },
    userInput_container: {
        flex: 1,
        margin: 1,
        backgroundColor: '#FFFFFF'
    },
    message_list: {
        flex: 1,
        padding: 5,
        borderWidth: 5,
        borderColor: '#000000'
    },
    message: {
        color: '#FFFFFF'
    }
})


export default Chat

