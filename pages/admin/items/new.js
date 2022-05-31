import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Title from '../../../components/Title'


const AddItem = () => {
    const router = useRouter()

    const [item, setItem] = useState({
        shyskull_id: '',
        rarity: '',
        available: true
    })

    const addItem = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const result = await axios.post(
                'https://shyskull-9ba8b-default-rtdb.asia-southeast1.firebasedatabase.app/items.json',
                item,
                config
            )

            if (result.statusText) {
                router.push('/admin/items')
            }
        } catch (error) {
            window.alert('may error')
            console.log(error)
        }
    }

    const changeHandler = (e) => {
        setItem((item) => ({ ...item, [e.target.name]: e.target.value }))
    }

    return (
        <div>
            <Title title={'Add Item'} />
            Add Item
            <form onSubmit={addItem}>
                <input
                    type="text"
                    name="shyskull_id"
                    placeholder="ShySkull ID"
                    onChange={changeHandler}
                    required
                />
                <input
                    type="text"
                    name="rarity"
                    placeholder="Rarity"
                    onChange={changeHandler}
                    required
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default AddItem
