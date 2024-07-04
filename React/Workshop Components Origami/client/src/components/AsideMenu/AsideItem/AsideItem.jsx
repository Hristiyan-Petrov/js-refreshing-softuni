import './AsideItem.scss'

const AsideItem = ({
    children
}) => (
    <li className="menu-item">
        <a href="">
            {children}
        </a>
    </li>
);

export default AsideItem;