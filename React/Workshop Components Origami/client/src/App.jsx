import { Component } from 'react';

import * as postService from './services/postService';

import style from './App.module.css';
import Header from './components/Header/Header';
import AsideMenu from './components/AsideMenu/AsideMenu';
import Main from './components/Main/Main';

class App extends Component {

    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            posts: [],
            selectedPost: null
        }
    };

    componentDidMount() {
        postService.getAll()
            .then(posts => {
                this.setState({ posts })
            })
            .catch(err => console.log('Error from componentDidMount APP: ' + err));
    }

    onAsideItemClick(id) {
        this.setState({ selectedPost: id });
    }

    getPosts() {
        return !this.state.selectedPost
            ? this.state.posts
            : [this.state.posts.find(x => x.id == this.state.selectedPost)];
    }

    render() {
        return (
            <div className={style.app}>
                {/* <h1 className={style.heading}>Hello World</h1> */}

                <Header />

                <div className={style.container}>
                    <AsideMenu
                        onAsideItemClick={this.onAsideItemClick.bind(this)}   // Bind because of calss component
                    />

                    <Main
                        posts={this.getPosts()}
                    />
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
