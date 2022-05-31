import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Title from '../../../components/Title'

const AddUser = () => {
    const router = useRouter()

    const nearIdRef = useRef()

    const [discord, setDiscord] = useState({
        username: '',
        id: ''
    })

    const addUser = async (e) => {
        e.preventDefault();
        try {
            const user = {
                nearId: nearIdRef.current.value,
                discord,
                items: []
            }

            const config = {
                headers: { 'Content-Type': 'application/json' }
            }

            const { data } = await axios.post('https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', user, config)

            if (window.confirm('add ticket to user?')) {
                router.push(`/admin/users/${data.name}`)
            } else {
                router.push('/admin/users')
            }
        } catch (error) {
            window.alert('may error')
            console.log(error)
        }
    }

    return (
        <div>
            <Title title={'Add User'} />
            Add user
            <form onSubmit={addUser}>
                <div>
                    <input type="text" name="nearId" ref={nearIdRef} placeholder="nearid" required />
                    <span>.near</span>
                </div>
                <input type="text" name="username" onChange={e => setDiscord(discord => ({ ...discord, username: e.target.value }))} placeholder="disc username" required />
                <input type="text" name="id" onChange={e => setDiscord(discord => ({ ...discord, id: e.target.value }))} placeholder="disc id" required />
                <table title='user tickets'></table>
                <button type="submit">Add User</button>
            </form>
        </div>
    )
}

export default AddUser
