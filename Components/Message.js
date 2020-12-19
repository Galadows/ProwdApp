import React from 'react'
import { StyleSheet, Text, Button, TextInput, View, FlatList } from 'react-native'
import uuid from 'uuid-random'

class Message extends React.Component{

     _getMessageType(obj_message){
        return obj_message.type
    }

    _displayMessage(current_message, type){
        if (type == "bot_message"){
            return this._displayBotMessage(current_message)
        }else if (type == "user_message"){
            return this._displayUserMessage(current_message)
        }
    }

    _displayBotMessage(bot_message){
        console.log(bot_message)
        console.log("--------------------");

        return (<FlatList
                    data={Object.keys(bot_message.message)}
                    keyExtractor={(item) => uuid()}
                    renderItem={({item}) => {
                        if(this._getMessageType(bot_message.message[item])=="text"){
                            return (<Text>{bot_message.message[item].content}</Text>)
                        }else if(this._getMessageType(bot_message.message[item])=="button"){
                            return (<Text>i'm a button</Text>)
                                    } 
                    }
                    }
                />
                )

        // if(this._getMessageType(bot_message.message[0])=="text"){
        //     return (<Text>{bot_message.message[0].content}</Text>)
        // }else if(this._getMessageType(bot_message)=="button"){
        //     return ( <Text>i'm a button</Text>)
        // }
    }

    _displayUserMessage(user_message){
        return ( <Text>{user_message.message}</Text>)
    }


    render(){
        const {message, type} = this.props
        return(
            <View>
                {this._displayMessage(message, type)}
            </View>
        )
    }




}

export default Message