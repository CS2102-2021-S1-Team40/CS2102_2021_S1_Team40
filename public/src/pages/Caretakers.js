import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Bid from "../components/Bid";
import Ratings from "../components/Bid";
import { selectFindCareTaker } from "../redux/slices/findCareTakerSlice";
import { getRatings } from "../redux/slices/careTakerSlice";

export default function Caretakers() {
  const [bid_page_open, setBidPageOpen] = useState(false);
  const [rating_page_open, setRatingPageOpen] = useState(false);
  const [caretaker_to_bid, setCareTakerToBid] = useState("");
  const [price_of_caretaker, setPriceOfCaretaker] = useState("");

  const caretakers = useSelector(selectFindCareTaker);

  function startBid(caretaker, price) {
    setBidPageOpen(true);
    setCareTakerToBid(caretaker);
    setPriceOfCaretaker(price);
  }
  
  const showRating = async (caretaker) => {
    await dispatch(
      getRatings(caretaker)
    );
    setRatingPageOpen(true);
  }

  if (Array.isArray(caretakers)) {
    return (
      <div>
        <h1>List of Caretakers that match your criteria</h1>
        <TableContainer component={Paper}>
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
            <TableBody>
              {caretakers.map((caretaker, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{caretaker["username"]}</TableCell>
                  <TableCell align="center">
                    {caretaker["advertised_price"]}
                  </TableCell>
                  <TableCell align="center">
                    {caretaker["start_date"].substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">
                    {caretaker["end_date"].substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() =>
                        showRating(
                          caretaker["username"],
                        )
                      }
                    >
                      Reviews
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() =>
                        startBid(
                          caretaker["username"],
                          caretaker["advertised_price"]
                        )
                      }
                    >
                      Bid
                    </Button>
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
      </div>
    );
  } else {
    return (
      <div>
        <h1>List of Caretakers that match your criteria</h1>
        <TableContainer component={Paper}>
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
        </TableContainer>
      </div>
    );
  }
}
