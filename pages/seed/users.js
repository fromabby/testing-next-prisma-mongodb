import { useState } from 'react'
import axios from 'axios'

const Users = () => {
    const [success, setSuccess] = useState(false)

    const createUsers = async () => {
        for (var i = 0; i < 5; i++) {
            try {
                const user = {
                    nearId: `user${i}`,
                    discord: {
                        id: `user${i}`,
                        username: `user${i}`
                    },
                    items: []
                }

                const config = {
                    headers: { 'Content-Type': 'application/json' }
                }

                const { data } = await axios.post('https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', user, config)

                const createdUser = { id: data.name, ...user }
                await createTickets(createdUser, config, i, 5)
            } catch (error) {
                window.alert('cannot create user')
            }
        }

        setSuccess(true)
    }

    const createTickets = async (user, config, i, n) => {
        for (var i = 0; i < 5; i++) {
            try {
                await axios.post(`https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/tickets.json`, {
                    ticketId: `${i}`,
                    user,
                    isMinted: false,
                    mintDate: 'N/A'
                }, config)
            } catch (error) {
                window.alert('cannot create ticket')
            }
        }
    }

    return (
        <div>
            <button onClick={() => createUsers()}>Create Users with tickets!</button>
            {success && <h1>Created users with tickets!</h1>}
        </div>
    )
}

export default Users
