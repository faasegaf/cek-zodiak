import "./App.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";

import Bg from "./Bg.jpg";

const zodiacList = require("./zodiac.json");
const monthList = require("./month.json");

function App() {
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");

  const getAge = (dateString) => {
    var ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  };

  const generateZodiac = (date, month) => {
    const arr = zodiacList.filter(
      ({ startDate, endDate }) =>
        startDate.split("-")[1] === month || endDate.split("-")[1] === month
    );
    return date <= arr[0].endDate.split("-")[0] ? arr[0] : arr[1];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nama, tanggal);
    const [year, month, date] = tanggal.split("-");
    const monthString = monthList[parseInt(month) - 1];
    const zodiac = generateZodiac(date, monthString);
    const age = getAge(tanggal);
    console.log(year);

    swal({
      title: `Hallo ${nama}`,
      text: `Usia anda saat ini adalah ${age} tahun \n Bintang anda adalah ${zodiac.name}`,
      icon: "success",
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login-body">
        <div className="border rounded login-border d-flex flex-wrap justify-content-center">
          <div>
            <div className="login-title text-center">
              <h2>Zodiac</h2>
            </div>
            <Form className="form-title">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
