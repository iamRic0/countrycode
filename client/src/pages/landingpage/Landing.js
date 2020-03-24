import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const Dashboard = props => {
  const [file, setfile] = useState(null);
  const [fileinfo, setfileinfo] = useState(false);
  const [dataqwqwqw, setdataqwqwqw] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log("sending data");
    const formdata = new FormData();

    setdataqwqwqw([]);
    setisLoading(true);

    for (let index = 0; index < data.supportingfiles.length; index++) {
      const element = data.supportingfiles[index];
      formdata.append("resobj", element);
    }

    var config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post("/api/newpost", formdata, config)
      .then(res => {
        console.log(res.data);
        setdataqwqwqw(res.data);
        setisLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const chngehndl = e => {
    setfile(e.target.files[0]);
    console.log(e.target.files[0]);
    if (e.target.files[0].type !== "application/x-zip-compressed") {
      setfileinfo(true);
      Swal.fire(
        "Invalid file type",
        `please select .zip file type insted of ${e.target.files[0].type}`,
        "warning"
      );
    } else {
      setfileinfo(false);
    }

    // console.log(e.target.files);
  };

  return (
    <div>
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Zip to County code</h1>

          <hr className="my-4" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="input-group">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  ref={register}
                  required
                  name="supportingfiles"
                  onChange={chngehndl}
                />
                <label class="custom-file-label" for="inputGroupFile04">
                  {file
                    ? file.name +
                      " " +
                      (file.size / 1024 / 1024).toFixed(2) +
                      "Mb"
                    : "Choose .zip file"}
                </label>
              </div>
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="submit"
                  id="inputGroupFileAddon04"
                  disabled={fileinfo}
                >
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="spinnerdashboard">
          <div
            hidden={!isLoading}
            className="spinner-border text-primary"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div>
          <table class="table">
            {dataqwqwqw[0] && (
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">File</th>
                  <th scope="col">Code</th>
                  <th scope="col">Country Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
            )}

            {dataqwqwqw[0] &&
              dataqwqwqw.map((ele, index1) => {
                return (
                  <tbody>
                    {ele.names &&
                      ele.names.map((ele2, index2) => {
                        return (
                          <tr>
                            {/* {ele2.code} {ele2.name} */}

                            <th scotre="row">{(1 + index1) * (1 + index2)}</th>
                            <td>{ele.filename}</td>
                            {ele.isfilecontent && <td>{ele2.code}</td>}
                            {ele.isfilecontent && <td>{ele2.name}</td>}
                            {ele.isfilecontent && <td>{ele2.status}</td>}
                            {!ele.isfilecontent && <td>No content</td>}
                            {!ele.isfilecontent && <td>No content</td>}
                            {!ele.isfilecontent && <td>No content</td>}
                          </tr>
                        );
                      })}
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
