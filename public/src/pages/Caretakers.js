import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Bid from "../components/Bid";
import Ratings from "../components/Ratings";
import { selectFindCareTaker } from "../redux/slices/findCareTakerSlice";
import { getRatings } from "../redux/slices/careTakerSlice";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import { getCreditCard } from "../redux/slices/petOwnerSlice";
import { selectUser } from "../redux/slices/userSlice";
import { useTableStyles } from "../styles";
import TableContainer from "@material-ui/core/TableContainer";
import moment from "moment-timezone";

export default function Caretakers() {
  const [bid_page_open, setBidPageOpen] = useState(false);
  const [rating_page_open, setRatingPageOpen] = useState(false);
  const [caretaker_to_bid, setCareTakerToBid] = useState("");
  const [price_of_caretaker, setPriceOfCaretaker] = useState("");
  const user = useSelector(selectUser);
  const petowner_username = user.username;

  const caretakers = useSelector(selectFindCareTaker);
  const dispatch = useDispatch();
  const classes = useTableStyles();

  const startBid = async (caretaker, price) => {
    await dispatch(getCreditCard(petowner_username));
    setBidPageOpen(true);
    setCareTakerToBid(caretaker);
    setPriceOfCaretaker(price);
  };

  const showRating = async (caretaker) => {
    await dispatch(getRatings(caretaker));
    setRatingPageOpen(true);
  };

  if (Array.isArray(caretakers)) {
    return (
      <Container>
        <h1>List of Caretakers that match your criteria</h1>
        <TableContainer component={Paper} className={classes.infoCard}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.headers}>Name</TableCell>
                <TableCell className={classes.headers}>Daily Price</TableCell>
                <TableCell className={classes.headers}>
                  Available Start Date
                </TableCell>
                <TableCell className={classes.headers}>
                  Available End Date
                </TableCell>
                <TableCell className={classes.headers}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {caretakers &&
                caretakers.map((caretaker, i) => (
                  <TableRow key={i}>
                    <TableCell>{caretaker["username"]}</TableCell>
                    <TableCell>
                      {caretaker["advertised_price"].split(".")[0]}
                    </TableCell>
                    <TableCell>
                      {moment(caretaker["start_date"])
                        .add(1, "day")
                        .format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(caretaker["end_date"])
                        .add(1, "day")
                        .format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell>
                      <div className={classes.flexRow}>
                        <Button
                          style={{ marginRight: 4 }}
                          variant="outlined"
                          color="secondary"
                          onClick={() => showRating(caretaker["username"])}
                        >
                          Reviews
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            startBid(
                              caretaker["username"],
                              caretaker["advertised_price"]
                            )
                          }
                        >
                          Bid
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Bid
          open={bid_page_open}
          onClose={() => setBidPageOpen(false)}
          caretaker={caretaker_to_bid}
          caretakerPrice={price_of_caretaker}
        />
        <Ratings
          open={rating_page_open}
          onClose={() => setRatingPageOpen(false)}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>There are unfortunately no Caretakers that match your criteria</h1>
        {/* <TableContainer component={Paper}>
          <Table stickyHeader aria-label="caretakers-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Daily Price</TableCell>
                <TableCell align="center">Available Start Date</TableCell>
                <TableCell align="center">Available End Date</TableCell>
                <TableCell align="center">Ratings</TableCell>
                <TableCell align="center">Bid?</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer> */}
      </Container>
    );
  }
}
