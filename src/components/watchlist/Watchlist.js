import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PickList } from 'primereact/picklist'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Checkbox } from 'primereact/checkbox'
import AccountContext from '../../context/AccountContext';
import WatchlistService from '../../services/WatchlistService';
import AccountService from '../../services/AccountService';
import Messages from '../util/Messages';

const WatchlistComponent = () => {
    const { toast } = useContext(AccountContext)
    const navigate = useNavigate()
    const [source, setSource] = useState([])
    const [target, setTarget] = useState([])
    const [isAlpha, setIsAlpha] = useState(false)

    useEffect(() => {
        const loadWatchlist = async () => {
            try {
                const currentUser = AccountService.getCurrentUser();

                if (!currentUser) {
                    navigate("/login")
                }

                const availableIssuers = await WatchlistService.getActiveIssuers();
                const accountWatchlist = await WatchlistService.getAccountWatchlist(currentUser.id)

                removeWatchlistIssuersFromSource(availableIssuers.data, accountWatchlist.data.issuers)
                setTarget(accountWatchlist.data.issuers)
                setIsAlpha(accountWatchlist.data.alphaReturns)
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

            await WatchlistService.updateAccountWatchlist(currentUser.id, { "issuers": target, "alphaReturns": isAlpha })
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
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Checkbox inputId="alpha" checked={isAlpha} onChange={e => setIsAlpha(e.checked)} />
                <label style={{ marginLeft: "5px", fontWeight: 500, fontFamily: "Inter" }} htmlFor="alpha">Soovin saada teavitusi potentsiaalsetest Tallinna börsi keskmist tootlust ületavatest tehingutest</label>
            </div>
            <div>
                <Button label={'Salvesta'} onClick={saveWatchlist} className="p-button-rounded" />
            </div>
        </div>
    );
}

export default WatchlistComponent