import { envs } from '@/config/envs'
import { io } from 'socket.io-client'
const url=process.env.NEXT_PUBLIC_BACKEND;
const socket = io(url, {
    transports: ['websocket'],
    query: {
        email: 'bernagsolsa@gmail.com', 
    }
})

export default socket
