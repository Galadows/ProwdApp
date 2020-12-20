
const AUTH_TOKEN = "53616c7465645f5f30c3fbcab5721e791de5c170251741079bc752ffed341158bbbfa3a8d3e413f32519ab3bdd2d9e73e3d8d9310094281d2aa23537720c3d8dbfcb7d59be889f82e8ccae57e8e7b0af"

export async function getChatHistory(conversation, lookback){
    const url = 'https://dev.beprowd.fr/webchat-history'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            auth: AUTH_TOKEN,
            conversation_id: conversation,
            type: "get",
            lookback: lookback
            })
        })
          return await response.json()
    }catch(error){
            console.error(error);
    }
}


export async function postUserMessage(conversation, user_message){
    const url = 'https://dev.beprowd.fr/webchat-connector'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            auth: AUTH_TOKEN,
            conversation_id: conversation,
            text: user_message
            })
        })
          return await response.json()
    }catch(error){
            console.error(error);
    }
}

