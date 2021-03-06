import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ArticleCard from "../../../components/articleCard/articleCard";
import firebase from "../../../Config/firebase";
import "./main.css";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
const db = firebase.firestore();
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      articles: [],
    };
  }
  componentDidMount() {
    this.getMyArticles();
  }

  getMyArticles = () => {
    db.collection("Articles")
      .limit(5)
      .get()
      .then((docs) => {
        if (!docs.empty) {
          let allArticles = [];
          docs.forEach(function (doc) {
            const article = {
              id: doc.id,
              ...doc.data(),
            };
            allArticles.push(article);
          });
          this.setState(
            {
              articles: allArticles,
            },
            () => {
              this.setState({
                isLoader: true
              });
            }
          );
        }
      });
  };

  render() {
    return (
      <div>
        <div className="banner_bg">
          <Container>
            <Row>
              <Col sm="7">
                <Carousel className="carousel">
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://botoquanmoc.com/upload_images/images/2019/10/09/IMG_0342-2(1).jpg"
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://botoquanmoc.com/upload_images/images/2019/10/09/IMG_0098-2.jpg"
                      alt="Third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://botoquanmoc.com/upload_images/images/2019/10/09/IMG_0260.jpg"
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>

              <Col sm="5">
                <div className="slider_cont_section">
                 
                  <h3>Blog ???m th???c</h3>
                  <p>
                  ???m th???c Vi???t Nam ng??y c??ng ??a d???ng,
                  phong ph?? khi v???a ti???p thu nh???ng tinh hoa c???a th??? gi???i v???a k??? th???a v?? ph??t huy nh???ng ?????c tr??ng n???i b???t c???a d??n t???c.
                  C??ng ch??nh nh??? ??i???u n??y, m?? ???m th???c n?????c ta ng??y c??ng kh???ng ?????nh v??? th??? c???a m??nh trong n???n ???m th???c c???a th??? gi???i,
                  khi li??n ti???p c?? nh???ng m??n ??n ???????c x???p h???ng cao trong nh???ng danh s??ch b??nh ch???n uy t??n.
                  </p>
                  <div className="button-section">
                    <Link to="#">Read More</Link>
                    <Link to={{pathname: '/contact'}}>Contact Us</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <h3 className="aboutUs">
          </h3>
          {this.state.isLoader
            ? this.state.articles.map((article, index) => {
                return <ArticleCard key={index} data={article} />;
              })
            : ""}
        </Container>
      </div>
    );
  }
}
