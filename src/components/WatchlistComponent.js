import { useContext, useEffect, useState } from 'react'
import { PickList } from 'primereact/picklist'
import AccountContext from '../context/AccountContext';
import WatchlistService from '../services/WatchlistService';

const WatchlistComponent = () => {
    const { userId } = useContext(AccountContext)
    const [source, setSource] = useState([])
    const [target, setTarget] = useState([])

    useEffect(() => {
        const loadWatchlist = async () => {
            try {
                const availableIssuers = await WatchlistService.getActiveIssuers();
                const accountWatchlist = await WatchlistService.getAccountIssuers(userId);

                removeWatchlistIssuersFromSource(availableIssuers.data, accountWatchlist.data)
                setTarget(accountWatchlist.data)

                //console.log(availableIssuers.data)
                //console.log(accountWatchlist.data)
            } catch (error) {
                console.log(error)
            }
        }

        loadWatchlist()
    }, [])

    const removeWatchlistIssuersFromSource = (availableIssuers, accountWatchlist) => {
        availableIssuers = availableIssuers.filter((issuer) => {
            return !accountWatchlist.has(issuer)
        }
        )
        console.log(availableIssuers)
        setSource(availableIssuers)
    }


    const itemTemplate = (item) => {
        return (
            <div>
                <span>{item.name}</span>
            </div>
        )
    }

    return (
        <PickList source={source}
            target={target}
            itemTemplate={itemTemplate}
            sourceHeader={"Saadaval olevad ettevõtted"}
            targetHeader={"Jälgimisnimerkirjas olevad ettevõtted"}
            showSourceControls={false}
            showTargetControls={false} />
    );
}

export default WatchlistComponent