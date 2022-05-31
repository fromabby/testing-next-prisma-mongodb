import { MDBDataTableV5 } from 'mdbreact'
import DataTableWrapper from '../../../components/DataTableWrapper'
import axios from 'axios'
import Link from 'next/link'
import useSWR from 'swr'
import Title from '../../../components/Title'

const ItemList = () => {
    const { data, error, isValidating, mutate } = useSWR(
        '/items.json?print=pretty'
    )

    const itemList =
        !isValidating &&
        data &&
        Object.keys(data).map((key) => ({ ...data[key], id: key }))

    const datatable = () => {
        const itemData = {
            columns: [
                {
                    label: 'ID',
                    field: 'shyskull_id',
                },
                {
                    label: 'AVAILABILITY',
                    field: 'available',
                },
                {
                    label: 'RARITY',
                    field: 'rarity',
                },
                {
                    label: '',
                    field: 'actions',
                },
            ],
            rows: [],
        }

        itemList &&
            itemList.forEach((item) => {
                itemData.rows.push({
                    shyskull_id: item.shyskull_id,
                    available: <p style={item.available ? { color: 'green' } : { color: 'red' }}>{item.available ? 'Yes' : 'No'}</p>,
                    rarity: item.rarity,
                    actions: (
                        <>
                            <Link href={`/admin/items/${item.id}`}>Update</Link>
                            <button onClick={() => deleteItem(item.id)}>
                                Delete
                            </button>
                        </>
                    ),
                })
            })

        return itemData
    }

    const deleteItem = async (id) => {
        try {
            await axios.delete(
                `https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/items/${id}.json`
            )
            mutate(data, true)
        } catch (error) {
            window.alert('error deleting')
            mutate(data, false)
            console.log(error)
        }
    }

    return (
        <div>
            <Title title={'Items'} />
            Item List
            <DataTableWrapper>
                <Link href="/admin/items/new">Add Item</Link>

                {!isValidating && itemList && (
                    <MDBDataTableV5
                        hover
                        entriesOptions={[25, 50, 75, 100]} entries={25}
                        pagesAmount={4}
                        data={datatable()}
                    />
                )}
                {error && <p>Error</p>}
            </DataTableWrapper>
        </div>
    )
}

export default ItemList
