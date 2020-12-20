import React from 'react'
import { StyleSheet, Text, Button, TextInput, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import uuid from 'uuid-random'


class Message extends React.Component{

     _getMessageType(obj_message){
        return obj_message.type
    }

    _displayMessage(current_message, type){
        if (type == "bot_message"){
            // console.log("--------------------THIS IS A BOT MESSAGE--------------------")
            // console.log(current_message)
            // console.log("------------------------------------------------------------")
            return this._displayBotMessage(current_message)
        }else if (type == "user_message"){
            // console.log("--------------------THIS IS A USER MESSAGE--------------------")
            // console.log(current_message)
            // console.log("------------------------------------------------------------")
            return this._displayUserMessage(current_message)
        }
    }

    _displayBotMessage(bot_message){
        return (<FlatList
                    data={Object.keys(bot_message.message)}
                    keyExtractor={(item) => uuid()}
                    renderItem={({item}) => {
                        if(this._getMessageType(bot_message.message[item])=="text"){
                            return (<View style={styles.bot_message_container}><Text style={styles.bot_message}>{bot_message.message[item].content}</Text></View>)
                        }else if(this._getMessageType(bot_message.message[item])=="buttons"){
                            return (<View style={styles.bot_question_container}>
                                        <Text style={styles.bot_buttons_title}>{bot_message.message[item].content.title}</Text>
                                        <FlatList
                                                data={bot_message.message[item].content.buttons}
                                                keyExtractor={(item) => uuid()}
                                                renderItem={({item}) => {
                                                return (<TouchableOpacity style={styles.bot_button_container} >
                                                             <Text style={styles.bot_button}>{item.title}</Text>
                                                        </TouchableOpacity>)
                                            }
                                            }
                                        />
                                    </View>)
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
        return ( <View style={styles.user_message_container}><Text style={styles.user_message}>{JSON.stringify(user_message.message).substring(1,JSON.stringify(user_message.message).length-1)}</Text></View>)
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


const styles = StyleSheet.create({
    bot_buttons_title: {
        padding: 10,
        alignSelf: 'center',
        backgroundColor: "#7FD18F",
        color: "#FFFFFF",
        borderRadius: 10
    },

    bot_button: {
        padding: 10,
        margin: 1,
        backgroundColor: "#08605F",
        color: "#FFFFFF",
        alignSelf: 'center',
        borderRadius: 10
    },
    
    bot_question_container: {
        margin: 3,
        alignSelf: 'center',
    },

    bot_button_container: {
        margin: 1,
        alignSelf: 'center',
    },

    user_message: {
        padding: 15,
        alignSelf: 'flex-end',
        backgroundColor: "#177E89",
        color: '#FFFFFF',
        borderRadius: 10
    },

    bot_message: {
        padding: 15,
        alignSelf: 'flex-start',
        borderRadius: 10,
        backgroundColor: "#7FD18F",
        color: "#FFFFFF"
    },

    bot_message_container: {
        padding: 1,
        margin: 3,
        marginRight: 50,
    },

    user_message_container: {
        padding: 1,
        margin: 3,
        marginLeft: 50,
        
    }


})

export default Message