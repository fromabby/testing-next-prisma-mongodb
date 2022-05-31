import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

import UserTicketTable from '../../../components/UserTicketTable'
import Title from '../../../components/Title'

const UpdateUser = () => {
    const router = useRouter()

    const userId = router.query.userId

    const { data, error, isValidating, mutate } = useSWR(
        `/users/${userId}.json`
    )

    if (!data && !isValidating) {
        console.error(error)
        router.push('/admin/users')
    }

    const updateUser = async e => {
        e.preventDefault()

        try {
            await axios.put(`https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`, user)

            mutate(data, true)
        } catch (error) {
            window.alert('error')
            mutate(data, false)
        }
    }

    const [user, setUser] = useState({
        nearId: '',
        discord: {}
    })

    const [discord, setDiscord] = useState({
        username: '',
        id: ''
    })

    useEffect(() => {
        if (data) {
            setUser({
                nearId: data.nearId,
                discord: data.discord
            })
        }
    }, [data])

    return (
        <div>
            <Title title={`Update User`} />
            {!isValidating && !error && user && <>
                <Title title={`Update ${user.nearId}`} />
                Update user {user.nearId + '.near'}
                <form onSubmit={updateUser}>
                    <div>
                        <input type="text" name="nearId" placeholder="nearid" value={user.nearId} required />
                        <span>.near</span>
                    </div>
                    <input type="text" name="username" onChange={e => setDiscord({ ...discord, username: e.target.value })} placeholder="disc username" value={user.discord.username} required />
                    <input type="text" name="id" onChange={e => setDiscord({ ...discord, id: e.target.value })} placeholder="disc id" value={user.discord.id} required />
                    <button type="submit">Update</button>
                </form>
                <UserTicketTable user={user} userId={userId} />
            </>}
        </div>
    )
}

export default UpdateUser
