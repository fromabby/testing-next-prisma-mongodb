import { MDBDataTableV5 } from 'mdbreact'
import DataTableWrapper from '../../../../components/DataTableWrapper'
import Title from '../../../../components/Title'

import useSWR from 'swr'

const MintedTicketList = () => {
    const { data, error, isValidating, mutate } = useSWR(
        '/tickets.json?orderBy="isMinted"&equalTo=true&print=pretty'
    )

    const tickets =
        !isValidating &&
        data &&
        Object.keys(data).map((key) => ({ ...data[key], id: key }))


    const datatable = () => {
        const data = {
            columns: [
                {
                    label: 'TICKET ID',
                    field: 'ticketId'
                },
                {
                    label: 'NEAR ID',
                    field: 'nearId'
                },
                {
                    label: 'STATUS',
                    field: 'status'
                },
                {
                    label: 'MINTING DATE',
                    field: 'mintDate'
                }
            ],
            rows: []
        }

        tickets && tickets.forEach(ticket => {
            data.rows.push({
                ticketId: ticket.ticketId,
                nearId: ticket.user?.nearId + '.near',
                status: <p style={{ color: 'green' }}>Minted</p>,
                mintDate: ticket.mintDate ? ticket.mintDate : 'N/A'
            })
        })

        return data
    }

    return (
        <div>
            <Title title={'Tickets | Minted'} />
            Minted tickets
            <DataTableWrapper>
                {!isValidating && tickets && <MDBDataTableV5 hover entriesOptions={[25, 50, 75, 100]} entries={25} pagesAmount={4} data={datatable()} />}
                {error && <p>Error</p>}
            </DataTableWrapper>
        </div>
    )
}

export default MintedTicketList