import {getChatHistory, postUserMessage} from '../API/PROWDApi'



export function _loadMessages(conversation, lookback){
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


export function _postAndLoadNewMessages(conversation, userMessage){
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

export function _getMessageType(obj_message){
    return obj_message.type
}