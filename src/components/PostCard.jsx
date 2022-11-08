import { GrLike } from "react-icons/gr";
import { BiCommentDetail, BiDotsVerticalRounded } from "react-icons/bi";
import { RiShareForwardLine, RiSendPlaneFill } from "react-icons/ri";
import {BsThreeDots} from "react-icons/bs"

import "../styles/postCard.css";
import { useState } from "react";
import {
    Button,
    Col,
    Dropdown,
    Form,
    Image,
    Modal,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    deletePostAction,
    updatePostAction,
    uploadImagePostAction,
} from "../redux/actions";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const PostCard = ({ post }) => {
    const actualProfile = useSelector((state) => state.profile.actualProfile);
    const [data, setData] = useState({
        text: post.text,
    });
    const [showUpdate, setShowUpdate] = useState(false);
    const showUpdateModal = () => setShowUpdate(!showUpdate);
    const [showDelete, setShowDelete] = useState(false);
    const showDeleteModal = () => setShowDelete(!showDelete);

    const dispatch = useDispatch();
    const [dataImage, setDataImage] = useState(null);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (dataImage !== null) {
            const formData = new FormData();
            formData.append("post", dataImage);
            dispatch(uploadImagePostAction(post._id, formData));
        } else {
            dispatch(updatePostAction(post._id, data));
        }
        showUpdateModal();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deletePostAction(post._id));
        showDeleteModal();
    };

    return (
        <>
            <div {...post}  className="post">
                <Row>
                    <Col xs={2}>
                        <Image
                            src={post.user.image}
                            rounded
                            style={{ maxWidth: "100%" }}
                        ></Image>
                    </Col>
                    <Col xs={8} className={"postElements"}>
                        <h5>{post.username}</h5>
                        <cite>{post.user.title}</cite>
                        <br />
                        <p title="Source Title">
                            {formatDistanceToNow(new Date(post.createdAt))} ago
                        </p>
                    </Col>
                    <Col xs={1}>
                        {actualProfile._id === post.user._id ? (

                         
                            <Dropdown alignRight>
                      
                                <Dropdown.Toggle
                                    variant="secondary"
                                    id="dropdown-basic"
                                >
                                    {/* <BiDotsVerticalRounded />{" "} */}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={showUpdateModal}>
                                        Modifica
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={showDeleteModal}>
                                        Elimina
                                    </Dropdown.Item>
                                </Dropdown.Menu>{" "}
                            </Dropdown>
                        ) : (
                            <></>
                        )}
                    </Col>
                </Row>
                <br />
                <p>{post.text}</p>
                {post.image && (
                    <Image
                        src={post.image}
                        style={{ maxWidth: "100%" }}
                    ></Image>
                )}
                <hr />
                <div className="post-buttons">
                    <span>
                        {" "}
                        <GrLike /> Like
                    </span>
                    <span>
                        {" "}
                        <BiCommentDetail /> Comment
                    </span>
                    <span>
                        {" "}
                        <RiShareForwardLine /> Share
                    </span>
                    <span>
                        {" "}
                        <RiSendPlaneFill /> Send
                    </span>
                </div>
            </div>

            <Modal centered show={showUpdate} onHide={showUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group>
                            
                                <Image src={data.image} width={"30px"}></Image>
                           
                            <Form.Control
                                type="file"
                                placeholder="Upload your image"
                                accept="image"
                                onChange={(e) =>
                                    setDataImage(e.target.files[0])
                                }
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                type="textarea"
                                as="textarea"
                                rows={4}
                                placeholder="Edit your post"
                                value={data.text}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        text: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Conferma modifica
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showUpdateModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal centered show={showDelete} onHide={showDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Elimina post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Sei sicuro di voler eliminare questo post?</p>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={handleDelete}
                    >
                        Conferma
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showDeleteModal}>
                        Close
                    </Button>{" "}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PostCard;
