import { useSelector, useState } from "react";
import { Row, Col, Form, Image, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateExperienceAction } from "../redux/actions";

const ExperienceFormEdit = ({ experience }) => {
  const dispatch = useDispatch();

  const [dataImage, setDataImage] = useState(null);

  const [data, setData] = useState({
    area: experience.area,
    company: experience.company,
    description: experience.description,
    role: experience.role,
    startDate: experience.startDate,
    endDate: experience.endDate,
    image: experience.image,
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    // if (dataImage !== null) {
       const formData = new FormData();
      formData.append("experience", dataImage);
      dispatch(updateExperienceAction(experience, data));
      console.log("experience updated");
    //}
  };

  return (
    <div>
      <Row>
        {/* <Col xs={12} md={6}> */}
        <Col>
          <Form className="text-left" onSubmit={handleSubmit}>
            <Form.Group>
              <div className=" m-2">
                <Form.Label>Logo esperienza</Form.Label>
                <Image
                  src={data.image}
                  width={"50px"}
                  style={{ margin: "5px" }}
                  onChange={(e) => {
                    setDataImage(e.target.files[0]);
                  }}
                ></Image>
              </div>
              <Form.Control
                type="file"
                placeholder="Upload your image"
                accept="image"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                value={data.company}
                onChange={(e) => {
                  setData({...data,company: e.target.value});
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={data.role}
                onChange={(e) => {
                  setData({...data,role: e.target.value});
                }}
              />
            </Form.Group>

            <Form.Row className="justify-content-space-around">
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={data.startDate || ""}
                  onChange={(e) => {
                    setData({...data,startDate: e.target.value});
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>End Date(or expected)</Form.Label>
                <Form.Control
                  type="date"
                  value={data.endDate || ""}
                  onChange={(e) => {
                    setData({...data, endDate: e.target.value});
                  }}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={2}
                value={data.description || ""}
                onChange={(e) => {
                  setData({...data,description: e.target.value});
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Area"
                value={data.area || ""}
                onChange={(e) => {
                  setData({...data,area: e.target.value});}}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Invia esperienza
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ExperienceFormEdit;
