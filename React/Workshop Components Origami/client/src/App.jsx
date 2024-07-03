import Header from './components/Header/Header';
import style from './App.module.css';

function App() {
  return (
    <div className={style.app}>
      <div className={style.container}>
        <h1>Hello World</h1>

        <Header />
      </div>
    </div>
  )
}

export default App
