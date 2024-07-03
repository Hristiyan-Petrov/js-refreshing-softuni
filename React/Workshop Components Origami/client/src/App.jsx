import { Component } from 'react';

import * as postService from './services/postService';

import style from './App.module.css';
import Header from './components/Header/Header';
import AsideMenu from './components/AsideMenu/AsideMenu';
import Main from './components/Main/Main';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };  // Set initial state
    }

    componentDidMount() {
        postService.getAll()
            .then(posts => {
                console.log('posts: ' + posts);
                this.setState({ posts })
            })
            .catch(err => console.log('Error from componentDidMount APP: ' + err));

    }

    render() {
        return (
            <div className={style.app}>
                {/* <h1 className={style.heading}>Hello World</h1> */}

                <Header />

                <div className={style.container}>
                    <AsideMenu />

                    <Main posts={this.state.posts}/>
                </div>
            </div>
        )
    }
}

// function App() {
// return (
//     <div className={style.app}>
//         {/* <h1 className={style.heading}>Hello World</h1> */}

//         <Header />

//         <div className={style.container}>
//             <AsideMenu />
//             <Main />
//         </div>
//     </div>
// )
// }

export default App;
