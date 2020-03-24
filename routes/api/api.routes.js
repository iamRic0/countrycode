const fs = require("fs");
const path = require("path");
const uuidv4 = require("uuid/v4");
const unzipper = require("unzipper");
const axios = require("axios");

const Data = require("../../models/data");

exports.newpost = async (req, res) => {
  console.log(req.files[0].path);
  const postid = uuidv4();

  var path2unzip = path.resolve(__dirname, "assets", "unzip");

  console.log(path2unzip);

  let payload = [];

  var i = 0;

  fs.createReadStream(req.files[0].path)
    .pipe(unzipper.Extract({ path: path2unzip }))
    .on("close", async () => {
      console.log("end");
      var filenames = [];
      var zipname = req.files[0].originalname;

      fs.readdirSync(path2unzip).forEach(fileNamess => {
        console.log("files in dir  - - -- " + fileNamess);

        if (fileNamess !== "null.txt") {
          filenames.push(fileNamess);

          var txtfilepath = path.resolve(
            __dirname,
            "assets",
            "unzip",
            fileNamess
          );

          console.log(txtfilepath);
          var data = fs.readFileSync(txtfilepath, "utf8");

          var dataarr = data.split("\r\n");

          var filtered = dataarr.filter(function(el) {
            return el != "";
          });

          var isfileconteent = true;

          console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);

          if (!data) {
            isfileconteent = false;
          }

          console.log(filtered);
          var temppayload = {
            fileName: fileNamess,
            countrycodes: filtered,
            isfilecontent: isfileconteent
          };
          payload.push(temppayload);

          fs.unlinkSync(txtfilepath);
        } else {
        }
      });

      let finalpayload = [];

      console.log(payload);

      var newdata = new Data({
        UUID: postid,
        createdAt: new Date().toISOString(),
        fileName: filenames,
        zipName: zipname,
        fileContent: JSON.stringify(payload)
      });

      newdata
        .save()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          res.status(500).send(err);
        });

      countryFetch(payload)
        .then(result => {
          console.log(
            " final payyyyyas212121212121211212121212121212121212yyyyyyyyyyyyyyyyyyyyyyyyyyy "
          );
          console.log(result);

          payload.forEach((element1, inx1) => {
            result.forEach((element2, idex2) => {
              if (idex2 == inx1) {
                console.log(element2.filename, element1.fileName);
                element2.filename = element1.fileName;
                element2.isfilecontent = element1.isfilecontent;

                if (!element1.isfilecontent) {
                  element2.names = [{ code: "NO CONTENT" }];
                }

                element2.names.forEach((element3, inx3) => {
                  element1.countrycodes.forEach((element4, inx4) => {
                    if (inx3 === inx4) {
                      element3.code = element4;
                    }
                  });
                });
              }
            });
          });

          Data.findOneAndUpdate(
            { UUID: postid },
            {
              $set: {
                countryNames: JSON.stringify(result)
              }
            }
          )
            .then(resulta => {
              res.json(result);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
};

function countryFetch(filelistwhole) {
  var promisearr2 = [];

  filelistwhole.forEach(codefiles => {
    promisearr2.push(proarr(codefiles));
  });

  return new Promise((resolve, reject) => {
    Promise.all(promisearr2)
      .then(result => {
        console.log(
          "weeeeeeeeeeeeeeeeeehhhhhhhhhhaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
        console.log(result);
        resolve(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
}

async function fetchcountry(code) {
  return await axioshelper(code); //axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`);
}

function axioshelper(code) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://restcountries.eu/rest/v2/alpha/${code}`)
      .then(result => {
        var temp = { name: result.data.name, status: "SUCCESS" };
        resolve({ data: temp });
      })
      .catch(err => {
        var temp = { name: "-", status: "NO_SUCH_COUNTRY" };
        resolve({ data: temp });
      });
  });
}

async function proarr(params2) {
  var promiseArr = [];
  params2.countrycodes.forEach(element => {
    promiseArr.push(fetchcountry(element));
  });

  return new Promise((resolve, reject) => {
    Promise.all(promiseArr)
      .then(result => {
        temparr = [];

        result.forEach(element4 => {
          temparr.push({
            name: element4.data.name,
            status: element4.data.status
          });
        });

        resolve({ filename: "", names: temparr });
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}
