import { v4 as uuidv4 } from 'uuid'

export const defaultEmail = {
    sender: 'sender',
    recepient: 'recipient',
    questions: [
        {id: uuidv4(),
        value: 'what time is the meeting?'},
    ],
    informs: [
        {id: uuidv4(),
        value: 'Bills birthday is friday'},
    ],
} 