import React, { useState, useEffect } from "react";
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
import { selectFindCareTaker } from "../redux/slices/findCareTakerSlice";

export default function Caretakers() {
  const [bid_page_open, setBidPageOpen] = useState(false);
  const [caretaker_to_bid, setCareTakerToBid] = useState(null);
  //const [caretakers, setCaretakers] = useState([]);

  const caretakers = useSelector(selectFindCareTaker);
  console.log("caretaker_to_bid: " + caretaker_to_bid);
  console.log("bid_page_open: " + bid_page_open);

  function start_bid(caretaker) {
    setBidPageOpen(true);
    setCareTakerToBid(caretaker);
  }

  // useEffect(() => {
  //     async function fetchData() {
  //         await fetch(`${API_HOST}/users/find-caretakers`, {
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //             method: "POST",
  //         })
  //             .then((response) => response.json())
  //             .then((response) => console.log(response))
  //             .then(async (result) => {
  //                 if (result.status === "success") {
  //                     console.log("yay");
  //                     await setCaretakers(result.data);
  //                 } else {
  //                     console.log("No Caretakers found");
  //                 }
  //             })
  //             .catch((err) => alert(err));
  //     }
  //     fetchData();
  // }, []);
  console.log(JSON.stringify(caretakers));

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
                      onClick={() => start_bid(caretaker["username"])}
                    >
                      Bid
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Bid open={bid_page_open} onClose={() => setBidPageOpen(false)} caretaker={caretaker_to_bid} />
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
                <TableCell align="center">Bid?</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    );
  }
} 