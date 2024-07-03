import './AsideItem.css'

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