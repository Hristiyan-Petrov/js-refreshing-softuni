import './Post.scss';

const Post = ({
    id,
    content,
    author
}) => {
    return (
        <div key={id} className='post-container'>
            <img src="blue-origami-bird.png" alt="blue-origami-bird" />
            <p className="post-description">
                {content}
            </p>
            <div>
                <span>
                    <small>Author:</small> {author}
                </span>
            </div>
        </div>
    );
};

export default Post;