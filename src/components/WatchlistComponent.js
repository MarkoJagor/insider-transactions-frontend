import { useContext, useEffect, useState } from 'react'
import { PickList } from 'primereact/picklist'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import AccountContext from '../context/AccountContext';
import WatchlistService from '../services/WatchlistService';
import AccountService from '../services/AccountService';
import Messages from './util/Messages';

const WatchlistComponent = () => {
    const { toast } = useContext(AccountContext)
    const [source, setSource] = useState([])
    const [target, setTarget] = useState([])

    useEffect(() => {
        const loadWatchlist = async () => {
            try {
                const currentUser = AccountService.getCurrentUser();

                const availableIssuers = await WatchlistService.getActiveIssuers();
                const accountWatchlist = await WatchlistService.getAccountIssuers(currentUser.id);

                removeWatchlistIssuersFromSource(availableIssuers.data, accountWatchlist.data)
                setTarget(accountWatchlist.data)
            } catch (error) {
                console.log(error)
            }
        }

        loadWatchlist()
    }, [])

    const removeWatchlistIssuersFromSource = (availableIssuers, accountWatchlist) => {
        const availableIssuersWithoutWatchlist = availableIssuers.filter(item => !accountWatchlist.find(({ issuerId }) => item.issuerId === issuerId))
        setSource(availableIssuersWithoutWatchlist)
    }

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    }

    const saveWatchlist = async () => {
        try {
            const currentUser = AccountService.getCurrentUser();

            await WatchlistService.updateAccountIssuers(currentUser.id, target)
            toast.current.clear();
            Messages.saveWatchlistSuccesful(toast)
        } catch (error) {
            console.log(error)
            toast.current.clear();
            Messages.saveWatchlistError(toast)
        }
    }

    const itemTemplate = (item) => {
        return (
            <div>
                <span>{item.name}</span>
            </div>
        )
    }

    return (
        <div>
            <div>
                <Toast ref={toast} />
                <PickList source={source}
                    target={target}
                    itemTemplate={itemTemplate}
                    sourceHeader={"Saadaval olevad ettevõtted"}
                    targetHeader={"Jälgimisnimerkirjas olevad ettevõtted"}
                    showSourceControls={false}
                    showTargetControls={false}
                    sourceStyle={{ height: '342px' }}
                    targetStyle={{ height: '342px' }}
                    onChange={onChange} />
            </div>
            <div>
                <Button label={'Salvesta'} onClick={saveWatchlist} className="p-button-rounded" />
            </div>
        </div>
    );
}

export default WatchlistComponent