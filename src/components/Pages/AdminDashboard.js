import React, { useEffect } from 'react';
import { Route, useNavigate, Link, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Button } from 'react-bootstrap';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [movies, setMovies] = React.useState([]);

  function redirectToDashboard(movies) {
    //Redirect to the python page
    navigate("../Dashboard",
      { state: { movie: movies } }
    );
  };
  const fetchMovies = async () => {
    const response = await fetch('http://localhost:8080/movies');
    const data = await response.json();
    console.log(data);
    setMovies(data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);


  // split the movies into 2 arrays, one for upcoming and one for now showing
  const nowShowing = movies.filter(movie => movie.now_playing);


  return (
    <div style={{ backgroundColor: 'gray', height: '700px' }}>
      <h2 style={{ textAlign: 'center', color: 'white' }}>Currently showing</h2>
      <Button style={{ width: '100px'}}variant='secondary'
      onClick={() => redirectToDashboard()}
      >
        User
      </Button>
      <table style={{}}>
        <thead>
          {
            nowShowing.map((movie, index) => {
              return (
                <th key={index}>
                  <td style={{ paddingLeft: "150px", margin: 30 }}>
                    <Col style={{ width: 135 }}>
                      <Row>
                        <img src={movie.poster} height='200' width='135' alt=''></img>
                      </Row>
                      <Row>
                        <Button style={{ width: '120px' }} variant="secondary">
                          Edit Movie
                        </Button>
                      </Row>
                    </Col>
                  </td>
                </th>
              )
            })
          }
        </thead>
      </table>
      <div style={{ paddingLeft: '20px', paddingTop: '50px'}}>
        <h3 style={{ color: 'white' }}>Tickets Sold: "seat state here"</h3>
      </div>
    </div>
  );
}
