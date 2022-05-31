import axios from 'axios'
import { useState, useCallback, useEffect, useMemo } from 'react'
import useSWR from 'swr'

const toArray = (arr, loading) => {
    return !loading &&
        arr &&
        Object.keys(arr).map((key) => ({ ...arr[key], id: key }))
}

const Randomizer = () => {
    const [userId, setUserId] = useState()
    const [user, setUser] = useState()

    const [ticketId, setTicketId] = useState()
    const [ticket, setTicket] = useState()

    const [items, setItems] = useState([])
    const [item, setItem] = useState({})

    const [results, setResults] = useState(null)

    const [reset, setReset] = useState(false)

    //on randomize button click -> get random item -> check availability -> update item availability -> update user details -> update ticket details (minted) -> display

    const randomize = async (e) => {
        e.preventDefault()
        // -> get random item
        const len = items.length - 1
        const idx = len === 1 ? 0 : Math.ceil(Math.random() * len + 0)

        setItem(items[idx])

        // -> check availability 
        if (!item.available) return

        // -> update item availability 
        const updatedItem = await updateItem()
        if (!updatedItem) return

        // -> update user details 
        const updatedUser = await updateUser(updatedItem)
        if (!updatedUser) return

        // -> update ticket details (minted) 
        const updatedTicket = await updateTicket(updatedUser)
        if (!updatedTicket) return

        // -> display
        // window.alert('Minted!')
        // setReset(true)
        // setTicketId('')
        // setUserId('')

        setResults({
            ticket: updatedTicket.ticketId,
            user: updatedUser.nearId,
            item: {
                shyskull_id: updatedItem.shyskull_id,
                rarity: updatedItem.rarity
            }
        })
    }

    //on reset click

    const updateItem = async () => {
        try {
            const { data } = await axios.put(`https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/items/${item.id}.json`, { ...item, available: false, mintDate: new Date(Date.now()) })

            return { ...data, id: item.id }
        } catch (error) {
            window.alert('Item update error')
        }
    }

    const updateUser = async (item) => {
        try {
            const link = `https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`
            const { data: user } = await axios.get(link)
            const items = user.items ? user.items : []

            const { data } = await axios.put(link, { ...user, items: [...items, item] })

            return { ...data, id: userId }
        } catch (error) {
            window.alert('User update error')
        }
    }

    const updateTicket = async (user) => {
        try {
            const { data } = await axios.put(`https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/tickets/${ticketId}.json`, { ...ticket, user, isMinted: !ticket.isMinted, mintDate: new Date(Date.now()) })

            return { ...data, id: ticketId }
        } catch (error) {
            window.alert('error updating ticket')
        }
    }

    console.log(results)

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Randomizer</h1>
            <ItemList reset={reset} item={item} items={items} setItems={setItems} />
            <form onSubmit={randomize}>
                <UserList reset={reset} userId={userId} setUserId={setUserId} setUser={setUser} />
                <TicketList userId={userId} ticketId={ticketId} setTicketId={setTicketId} setTicket={setTicket} />
                <button type='submit'>Randomize</button>
            </form>
            <div style={{ paddingBottom: '30px' }}>
                <h3>Results</h3>
                {results && <div>
                    <p><span style={{ fontWeight: '500' }}>User:</span> {results.user}</p>
                    <p><span style={{ fontWeight: '500' }}>Item # - Rarity:</span> #{results.item.shyskull_id} - {results.item.rarity}</p>
                    <p><span style={{ fontWeight: '500' }}>Ticket #:</span> {results.ticket}</p>
                </div>}
            </div>
        </div>
    )
}

const ItemList = ({ reset, item, items, setItems }) => {
    //get ALL available items
    const { data, isValidating, mutate } = useSWR('/items.json?orderBy="available"&equalTo=true&print=pretty')

    useEffect(() => {
        setItems(toArray(data, isValidating))
    }, [data, isValidating])

    useEffect(() => {
        mutate(data, true)
    }, [reset])

    return (
        <div style={{ paddingBottom: '30px' }}>
            <h3>Available Items</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ul>
                    {items && items.map(item => (
                        <li key={item.id}>{item.shyskull_id}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const UserList = ({ reset, userId, setUserId, setUser }) => {
    //get ALL users
    const { data, isValidating, mutate } = useSWR('/users.json?print=pretty')
    const users = useMemo(() => toArray(data, isValidating), [data, isValidating])

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`)

                setUser(data)
            } catch (error) {
                window.alert('error')
            }
        }

        fetch()
    }, [userId])

    useEffect(() => {
        mutate(data, true)
    }, [reset])

    return (
        <div style={{ paddingBottom: '30px' }}>
            <h3>Select User</h3>
            <select value={userId} onChange={e => setUserId(e.target.value)} style={{ width: '100px' }} required>
                <option>-</option>
                {users && users.map(user => (
                    <option key={user.id} value={user.id}>{user.nearId}</option>
                ))}
            </select>
        </div>
    )
}

const TicketList = ({ userId, ticketId, setTicketId, setTicket }) => {
    const [tickets, setTickets] = useState([])

    //on user dropdown change -> update ticket list
    useEffect(() => {
        //get ALL tickets of user
        const fetch = async () => {
            try {
                const { data } = await axios.get(`https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/tickets.json?orderBy="user/id"&equalTo="${userId}"&print=pretty`)

                setTickets(toArray(data, false))
            } catch (error) {
                window.alert('error')
                console.log(error)
            }
        }

        if (userId) fetch()
    }, [userId])

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/tickets/${ticketId}.json`)

                setTicket(data)
            } catch (error) {
                window.alert('error')
                console.log(error)
            }
        }

        if (ticketId) fetch()
    }, [ticketId])

    return (
        <div style={{ paddingBottom: '30px' }}>
            <h3>Select Ticket</h3>
            <select value={ticketId} onChange={e => setTicketId(e.target.value)} style={{ width: '100px' }}>
                <option>-</option>
                {tickets && tickets.map(ticket => (
                    <option key={ticket.id} value={ticket.id} disabled={ticket.isMinted}>{ticket.ticketId}</option>
                ))}
            </select>
        </div>
    )
}

export default Randomizer