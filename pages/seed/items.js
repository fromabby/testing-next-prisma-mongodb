import { useState } from 'react'
import axios from 'axios'

const Items = () => {
    const [success, setSuccess] = useState(false)

    const createItems = async () => {
        for (var i = 1; i <= 30; i++) {
            try {
                const config = {
                    headers: { 'Content-Type': 'application/json' }
                }

                await axios.post('https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/items.json', {
                    shyskull_id: `${i}`,
                    rarity: `N${i}`,
                    available: true,
                    mintDate: 'N/A'
                }, config)
            } catch (error) {
                window.alert('may error')
            }
        }

        setSuccess(true)
    }

    return (
        <div>
            <button onClick={() => createItems()}>Create Items</button>
            {success && <h1>Created items!</h1>}
        </div>
    )
}

export default Items
