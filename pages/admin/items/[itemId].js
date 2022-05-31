import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import Title from '../../../components/Title'

const UpdateItem = () => {
    const router = useRouter()

    const itemId = router.query.itemId

    const [item, setItem] = useState({})

    const { data, error, isValidating, mutate } = useSWR(
        `/items/${itemId}.json`
    )

    useEffect(() => {
        data && setItem(data)
    }, [data])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.put(
                `https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/items/${itemId}.json`,
                item
            )
            mutate(data, true)
            if (result.statusText) {
                router.push('/admin/items')
            }
        } catch (error) {
            window.alert('may error')
        }
    }

    const changeHandler = (e) => {
        setItem((item) => ({ ...item, [e.target.name]: e.target.value }))
    }

    return (
        <div>
            <Title title={'Update Shy Skull Item'} />
            {!isValidating && <>
                <Title title={`Update ShySkull #${data?.shyskull_id}`} />
                <h3>Update ShySkull #{data?.shyskull_id}</h3>
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        name="shyskull_id"
                        value={item?.shyskull_id}
                        onChange={changeHandler}
                        required
                    />
                    <input
                        type="text"
                        name="rarity"
                        value={item?.rarity}
                        onChange={changeHandler}
                        required
                    />
                    <button type="submit">Update</button>
                </form>
            </>}
        </div>
    )
}

export default UpdateItem
