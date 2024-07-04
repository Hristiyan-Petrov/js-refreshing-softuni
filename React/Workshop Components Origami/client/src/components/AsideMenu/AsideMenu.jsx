import './AsideMenu.css'
import AsideItem from './AsideItem/AsideItem'
import { useState } from 'react';

import { MENU_ITEMS } from './AsideMenuConstants';

const AsideMenu = ({
    onAsideItemClick
}) => {

    const [currItem, setCurrItem] = useState();
    
    const asideMenuClickHandler = (id) => {
        setCurrItem(id);
        onAsideItemClick(id);
    }

    return (
        <aside className="aside-menu">
            {MENU_ITEMS.map(x =>
                <AsideItem key={x.id}
                    id={x.id}
                    isSelected={x.id == currItem}
                    onClick={asideMenuClickHandler}
                >
                    {x.text}
                </AsideItem>
            )}
        </aside>
    );
};

export default AsideMenu;