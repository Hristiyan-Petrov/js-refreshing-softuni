import Post from '../Post/Post';
import './Main.scss';

const Main = ({
    posts
}) => {
    console.log(posts);

    return (
        <main className='main-container'>
            <h1>Hello World Header!</h1>

            <div className="posts">
                {posts.map(x =>
                    <Post
                        key={x.id}
                        content={x.content}
                        author={x.author}
                    // post={x}         // Is equivalent. Delegate all props to be handled down the chain
                    />
                )}
            </div >
        </main>

    )
};

export default Main;