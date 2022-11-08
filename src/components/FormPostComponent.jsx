import { useState } from "react";
import { Button, Col, Form, Image, Modal,FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createPostAction, uploadImagePostAction } from "../redux/actions";
import {RiVideoFill,RiArticleFill} from "react-icons/ri"
import { MdInsertPhoto } from "react-icons/md";
import {BsFillCalendarDateFill} from "react-icons/bs"
import "../styles/postCard.css"

const FormPostComponent = () => {
    const [data, setData] = useState({
        text: "",
    });
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const showModal = () => setShow(!show);

    const [dataImage, setDataImage] = useState(null);

    const handleCreate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("post", dataImage);
        dispatch(createPostAction(data, formData));
        setData({
            text: "",
        });
        showModal();
    };

    return (
        <>
            <Col className="feed">
                <div className="feed-inputContainer">
                    <div className="feed-input">

                    
                        <Button
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                width: "100%",
                                textAlign: "start",
                               
                              
                            }}
                            onClick={showModal}
                        >
                       <span style={{color: "black"}}>Avvia un post</span>
                        </Button>
                    </div>
                {/* <div className="post-icons">
                    <Button>
                    <MdInsertPhoto/><span>Foto</span>
                    </Button>
                    <Button>
                        <RiVideoFill/> <span>Video</span>
                    </Button>
                    <Button>
                        <BsFillCalendarDateFill/> <span>Evento</span>
                    </Button>
                    <Button>
                        <RiArticleFill/> <span>Scrivi un Articolo</span>
                    </Button>
                </div> */}
          
                </div>
            </Col>

            <Modal centered show={show} onHide={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea un post</Modal.Title>
                </Modal.Header>{" "}
                <Form onSubmit={handleCreate}>
                    <Modal.Body>
                        <Form.Group>
                            <div className=" m-2">
                                <Form.Label>Carica una foto</Form.Label>
                                <Image src={data.image} width={"30px"}></Image>
                            </div>
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
                                type="text"
                                as="textarea"
                                rows={2}
                                placeholder="Di che cosa vorresti parlare?"
                                required
                                value={data.text}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        text: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <a href="#">Aggiungi hashtag</a>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Pubblica
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default FormPostComponent;
