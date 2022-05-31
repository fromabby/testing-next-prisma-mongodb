import { MDBDataTableV5 } from 'mdbreact'
import DataTableWrapper from '../../../components/DataTableWrapper'
import Title from '../../../components/Title'

import axios from 'axios'
import Link from 'next/link'
import useSWR from 'swr'

const UserList = () => {
    const { data: users, error: userError, isValidating: userLoading, mutate } = useSWR(
        '/users.json?print=pretty'
    )

    const { data: tickets, error: ticketError, isValidating: ticketLoading } = useSWR(
        `/tickets.json`
    )

    const userList =
        !userLoading &&
        users &&
        Object.keys(users).map((key) => ({ ...users[key], id: key }))


    const ticketList =
        !ticketLoading &&
        tickets &&
        Object.keys(tickets).map((key) => ({ ...tickets[key], id: key }))

    const datatable = () => {
        const userData = {
            columns: [
                {
                    label: 'NEAR ID',
                    field: 'nearId'
                },
                {
                    label: 'DISCORD',
                    field: 'discord'
                },
                {
                    label: 'TICKETS',
                    field: 'tickets'
                },
                {
                    label: '',
                    field: 'actions'
                }
            ],
            rows: []
        }

        userList && userList.forEach(user => {
            let ticketLength = 0

            ticketList && ticketList.forEach(ticket => {
                if (ticket.user?.id === user.id) {
                    ticketLength += 1
                }
            })

            userData.rows.push({
                nearId: user?.nearId + '.near',
                discord: user?.discord?.username + '#' + user?.discord?.id,
                tickets: ticketLength,
                actions: <>
                    <Link href={`/admin/users/${user.id}`}>Update</Link>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                </>
            })
        })

        return userData
    }


    const deleteUser = async id => {
        try {
            await axios.delete(`https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`)
            mutate(users, true)
        } catch (error) {
            window.alert('error deleting')
        }
    }

    return (
        <div>
            <Title title={`Users`} />
            List all users
            <DataTableWrapper>
                <Link href="/admin/users/new">Add user</Link>
                {!userLoading && userList && <MDBDataTableV5 hover entriesOptions={[25, 50, 75, 100]} entries={25} pagesAmount={4} data={datatable()} />}
                {userError && <p>Error</p>}
            </DataTableWrapper>
        </div>
    )
}

export default UserList