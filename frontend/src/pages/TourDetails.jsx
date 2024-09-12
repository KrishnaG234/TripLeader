import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    alert(`${reviewText}, ${tourRating}`);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img
                src={photo}
                alt=""
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div className="tour__info">
                <h2>{title}</h2>
                <div className="d-flex align-items-center gap-5 ">
                  <span className="tour__rating d-flex align-items-center gap-1">
                    <i
                      className="ri-star-fill"
                      style={{ color: "var(--secondary-color)" }}
                    ></i>
                    {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                      "Not rated"
                    ) : (
                      <span>({reviews?.length})</span>
                    )}
                  </span>

                  <span>
                    <i className="ri-map-pin-user-fill"></i>
                    {address}
                  </span>
                </div>
                <div className="tour__extra-details">
                  <span>
                    <i className="ri-map-pin-2-line"></i>
                    {city}
                  </span>
                  <span>
                    <i className="ri-money-dollar-circle-line"></i>
                    {price} per person
                  </span>
                  <span>
                    <i className="ri-map-pin-time-line"></i>
                    {distance} k/m
                  </span>
                  <span>
                    <i className="ri-group-line"></i>
                    {maxGroupSize} people
                  </span>
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>

              <div className="tour__reviews mt-4">
                <h4>Reviews({reviews?.length} reviews)</h4>

                <Form onSubmit={submitHandler}>
                  <div
                    className="d-flex align-items-center gap-3 
                    mb-4 rating__group"
                  >
                    {[...Array(5).keys()].map((index) => (
                      <span
                        key={index + 1}
                        onClick={() => setTourRating(index + 1)}
                      >
                        {index + 1} <i className="ri-star-s-fill"></i>
                      </span>
                    ))}
                  </div>

                  <div className="review__input">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder="Share your thoughts"
                      required
                    />
                    <button
                      className="btn primary__btn text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>

                <ListGroup className="user__reviews">
                  {reviews?.map((review) => (
                    <div className="review__item" key={review.id}>
                      <img src={avatar} alt="" />

                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>{review.user}</h5>
                            <p>
                              {new Date(review.date).toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </p>
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating}
                            <i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <h6>{review.comment}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </div>
          </Col>

          <Col lg="4">
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;
