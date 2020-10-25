import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { API_HOST } from "../consts";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Bid from "../components/Bid";
import { selectCareTaker } from "../redux/slices/careTakerSlice";

export default function Caretakers() {
  const [bid_page_open, setBidPageOpen] = useState(false);
  //const [caretakers, setCaretakers] = useState([]);
  const caretakers = useSelector(selectCareTaker);

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
                    onClick={() => setBidPageOpen(true)}
                  >
                    Bid
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Bid open={bid_page_open} onClose={() => setBidPageOpen(false)} />
    </div>
  );
}
