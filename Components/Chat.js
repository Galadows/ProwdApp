import React from 'react'
import { StyleSheet, Text, Image, Button, TextInput, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants'
import messages from '../Helpers/PROWDAnswer'
import Message from './Message'
import uuid from 'uuid-random'
import {getChatHistory, postUserMessage} from '../API/PROWDApi'


class Chat extends React.Component{

    constructor(props){
        super(props)
        this.textInput = React.createRef();
        this.userMessage = ""
        this._postAndLoadNewMessages = this._postAndLoadNewMessages.bind(this);
        this.state = {
            firstLaunch: 0,
            chatHistory: [[]],
            isLoading: false
        }
    }

    _displayLoading(){
        if (this.state.isLoading){
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="#0000ff"/>
            </View>
        )
        }
    }
    

    _loadAtLaunch(conversation, lookback){
        if (this.state.firstLaunch < 1) {
            this._loadMessages(conversation, lookback)
        }
    }

    _loadMessages(conversation, lookback){
            getChatHistory(conversation, lookback).then(data => {
                this.setState({
                    firstLaunch: 1,
                    chatHistory: [...data],
                    isLoading: false
                },() => {
                    console.log("----------------------THIS IS THE CHAT HISTORY------------------------")
                    console.log(this.state.chatHistory[0])
                } )})

    }

    _postAndLoadNewMessages(conversation, userMessage){
        this.setState({isLoading: true})
        if (this.userMessage.length > 0) {
            postUserMessage(conversation, userMessage).then(data => {
                    let userMessage= [{
                        message: this.userMessage,
                        type: "user_message"
                    }] 
                    this.userMessage = ""
                    let botAnswer = [{
                        message: data,
                        type: "bot_message"
                    }]
                    this.textInput.current.clear();
                this.setState({
                    chatHistory: [...this.state.chatHistory, ...userMessage, ...botAnswer],
                    isLoading: false
                },() => {
                    console.log("----------------------THIS IS THE CHAT HISTORY------------------------")
                    console.log(this.state.chatHistory[this.state.chatHistory.length-2])
                    console.log(this.state.chatHistory[this.state.chatHistory.length-1])
                } )})
           
        }

    }

    _getMessageType(obj_message){
        return obj_message.type
    }

    _userTextInputChanged(text) {
        this.userMessage = text
    }
    

    render(){
        //console.log(messages)
        this._loadAtLaunch("114548-4542457-142424-452452-webchat","2020-12-10T19:37:28.622Z")
        return (
            <View style={styles.main_container}>
                <View style={styles.header_container}>
                <Image
                        style={styles.prowdLogo}
                        source={{
                        uri: 'https://www.beprowd.com/wp-content/uploads/2018/11/Logo-Prowd.png',
                        }}
                    />
                </View>

                <View style={styles.chat_container}>
                    <FlatList
                        maxToRenderPerBatch={100}
                        style={styles.message_list}
                        data={Object.keys(this.state.chatHistory)}
                        keyExtractor={(item) => uuid()}
                        renderItem={({item}) => <Message message={this.state.chatHistory[item]} type={this._getMessageType(this.state.chatHistory[item])} botButtonFunc={this._postAndLoadNewMessages} /> }
                    />
                </View>

                <View style={styles.userInput_container}>
                    <TextInput ref={this.textInput} onChangeText={(text) => this._userTextInputChanged(text)} onSubmitEditing={() => this._postAndLoadNewMessages('114548-4542457-142424-452452-webchat', this.state.userMessage)} style={styles.userinput} placeholderTextColor="#FFFFFF" placeholder="Message"></TextInput>
                    <TouchableOpacity onPress={() => this._postAndLoadNewMessages('114548-4542457-142424-452452-webchat', this.userMessage)}>
                        <Image
                            style={styles.sendLogo}
                            source={require('../assets/sendIcon.png')}
                        />
                    </TouchableOpacity>
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
        backgroundColor: '#CDEDD4'
    },
    header_container: {
        flex: 1,
        margin: 1,
    },
    chat_container: {
        flex: 8,
        marginTop: 1,
        overflow: 'hidden'
    },
    userInput_container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#177E89'
    },
    userinput: {
        flex: 1,
        margin: 5,
        color: '#FFFFFF',

    },
    prowdLogo: {
        flex: 1,
        marginTop: 10,
        width: 170,
        alignSelf: 'center'

    },
    sendLogo: {
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 0.5 ,
        padding: 30,
        marginRight: 10,
        alignSelf: 'center',
        borderTopRightRadius: 20,

    },
    header_text: {
        margin: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20
    },
    message_list: {
        flex: 1,
        padding: 5,
    },
    message: {
        color: '#FFFFFF'
    }
})


export default Chat

