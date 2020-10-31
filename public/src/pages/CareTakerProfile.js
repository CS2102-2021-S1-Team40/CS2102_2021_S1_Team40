import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  getCareTakerBasicInfo,
  selectCareTaker,
} from "../redux/slices/careTakerSlice";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { MONTH_ARRAY } from "../consts";
import moment from "moment";
import AdvertiseAvail from "../components/AdvertiseAvail";
import LeaveRetrieval from "../components/LeaveRetrieval";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  infoGroup: {
    display: "flex",
    flexDirection: "row",
  },
  infoCard: {
    flex: 1,
    margin: 16,
    textTransform: "capitalize",
  },
  title: {
    fontSize: 14,
  },
}));

export default function CareTakerProfile() {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const caretakerInfo = useSelector(selectCareTaker);

  const [availOpen, setAvailOpen] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getCareTakerBasicInfo(user.username));
    }
  }, [dispatch, user, availOpen]);

  if (user && user.type.includes("caretaker")) {
    return (
      <Container>
        <h1>Your Caretaker Profile</h1>
        {caretakerInfo && caretakerInfo["job_type"] === "Part Time" && (
          <Button onClick={() => setAvailOpen(true)}>
            Advertise Availability
          </Button>
        )}
        <div className={classes.infoGroup}>
          <Card style={{ flex: 1 }} className={classes.infoCard}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Basic Info
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Job Type</TableCell>
                    <TableCell>
                      {caretakerInfo && caretakerInfo["job_type"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Number of Pet Days</TableCell>
                    <TableCell>
                      {caretakerInfo && caretakerInfo["pet_days"]} Days
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Expected Salary ({MONTH_ARRAY[new Date().getMonth()]})
                    </TableCell>
                    <TableCell>
                      ${caretakerInfo && caretakerInfo["salary"]}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {caretakerInfo &&
            (caretakerInfo["job_type"] === "Part Time" ? (
              <Card style={{ flex: 2 }} className={classes.infoCard}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Availabilities
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Pet Type</TableCell>
                        <TableCell>Advertised Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {caretakerInfo &&
                        caretakerInfo["availability"] &&
                        caretakerInfo["availability"].map((row, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              {moment(row["start_date"]).format("DD MMM YYYY")}
                            </TableCell>
                            <TableCell>
                              {moment(row["end_date"]).format("DD MMM YYYY")}
                            </TableCell>
                            <TableCell>{row["pet_type"]}</TableCell>
                            <TableCell>{row["advertised_price"]}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card style={{ flex: 2 }} className={classes.infoCard}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Your Leaves
                  </Typography>
                  <LeaveRetrieval />
                </CardContent>
              </Card>
            ))}
        </div>
        <Card className={classes.infoCard}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Reviews
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pet Owner</TableCell>
                  <TableCell>Pet Name</TableCell>
                  <TableCell>Review</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {caretakerInfo &&
                  caretakerInfo["reviews"] &&
                  caretakerInfo["reviews"].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {row["petowner_username"]}
                      </TableCell>
                      <TableCell>{row["pet_name"]}</TableCell>
                      <TableCell>{row["review"]}</TableCell>
                      <TableCell>{row["rating"]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className={classes.infoCard}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Ongoing Jobs
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pet Owner</TableCell>
                  <TableCell>Pet Name</TableCell>
                  <TableCell>Transfer Method</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {caretakerInfo &&
                  caretakerInfo["ongoing"] &&
                  caretakerInfo["ongoing"].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {row["petowner_username"]}
                      </TableCell>
                      <TableCell>{row["pet_name"]}</TableCell>
                      <TableCell>{row["transfer_method"]}</TableCell>
                      <TableCell>{row["price"]}</TableCell>
                      <TableCell>
                        {moment(row["start_date"]).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(row["end_date"]).format("DD MMM YYYY")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className={classes.infoCard}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Past Jobs
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pet Owner</TableCell>
                  <TableCell>Pet Name</TableCell>
                  <TableCell>Transfer Method</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {caretakerInfo &&
                  caretakerInfo["past"] &&
                  caretakerInfo["past"].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {row["petowner_username"]}
                      </TableCell>
                      <TableCell>{row["pet_name"]}</TableCell>
                      <TableCell>{row["transfer_method"]}</TableCell>
                      <TableCell>{row["price"]}</TableCell>
                      <TableCell>
                        {moment(row["start_date"]).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(row["end_date"]).format("DD MMM YYYY")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <AdvertiseAvail open={availOpen} onClose={() => setAvailOpen(false)} />
      </Container>
    );
  }
  return (
    <Container>
      <h1>You are not a Caretaker yet! Please register to be one!</h1>
    </Container>
  );
}
