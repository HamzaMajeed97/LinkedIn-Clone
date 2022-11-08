import { useEffect } from "react";
import { Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAction } from "../redux/actions";
import FormPostComponent from "./FormPostComponent";
import PostCard from "./PostCard";
 import '../styles/postCard.css';

const PostsComponent = () => {
    const posts = useSelector((state) => state.post.posts);
    const loadedPosts = useSelector((state) => state.post.loading);
    const errorPosts = useSelector((state) => state.post.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostsAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Col className="feed_container" sm={12} md={9} lg={6}>
            <div>
                <FormPostComponent />
                {
                    //form per la creazione dei post
                }
                {!loadedPosts ? (
                    !errorPosts && (
                        <Col>
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </Col>
                    )
                ) : (
                    <Spinner
                        animation="grow"
                        variant="primary"
                        style={{ width: "60px", height: "60px" }}
                    />
                )}
                {
                    //visualizzazione dei post con spinner per il loading
                }
            </div>
        </Col>
    );
};

export default PostsComponent;
