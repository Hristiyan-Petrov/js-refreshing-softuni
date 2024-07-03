import style from './App.module.css';
import Header from './components/Header/Header';
import AsideMenu from './components/AsideMenu/AsideMenu';
import Main from './components/Main/Main';


function App() {
    return (
        <div className={style.app}>
            {/* <h1 className={style.heading}>Hello World</h1> */}

            <Header />

            <div className={style.container}>
                <AsideMenu />
                <Main />
            </div>
        </div>
    )
}

export default App
