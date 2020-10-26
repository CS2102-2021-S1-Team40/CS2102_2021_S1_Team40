import React, { useState, useEffect } from "react";
import { API_HOST } from "../consts";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { selectUser } from "../redux/slices/userSlice";
import BidAccept from "./BidAccept";
import BidDecline from "./BidDecline";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function BidRetrievalCaretaker(props) {
  const user = useSelector(selectUser);
  const useStyles = makeStyles({
    auth: {
      marginLeft: "auto",
    },
  });

  const [bids, setBids] = useState([]);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [bidsData, setData] = useState("");

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      await fetch(`${API_HOST}/caretakers/bids/${user.username}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status === "success") {
            await setBids(result.data);
          } else {
            await setBids(null);
          }
        })
        .catch((err) => alert(err));
    }
    fetchData();
  }, [acceptOpen, declineOpen, bidsData]);

  if (bids != null) {
    return (
      <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Pet Owner Username</TableCell>
                <TableCell align="right">Pet Name</TableCell>
                <TableCell align="right">Pet Type</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Price ($ per day)</TableCell>
                <TableCell align="right">Transfer Method</TableCell>
                <TableCell align="right">Payment Method</TableCell>
                <TableCell align="right">Special Requirements</TableCell>
                <TableCell align="right">Accept</TableCell>
                <TableCell align="right">Decline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bids.map((bid, i) => (
                <TableRow key={i}>
                  <TableCell align="right">
                    {bid.row.split(",")[0].split("(")[1]}
                  </TableCell>
                  <TableCell align="right">{bid.row.split(",")[1]}</TableCell>
                  <TableCell align="right">{bid.row.split(",")[2]}</TableCell>
                  <TableCell align="right">{bid.row.split(",")[3]}</TableCell>
                  <TableCell align="right">{bid.row.split(",")[4]}</TableCell>
                  <TableCell align="right">{bid.row.split(",")[5]}</TableCell>
                  <TableCell align="right">{bid.row.split(",")[6]}</TableCell>
                  <TableCell align="right">{bid.row.split(",")[7]}</TableCell>
                  <TableCell align="right">
                    {bid.row.split(",")[8].split(")")[0]}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setData(bid.row);
                        setAcceptOpen(true);
                      }}
                    >
                      Accept Bid
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setData(bid.row);
                        setDeclineOpen(true);
                      }}
                    >
                      Decline Bid
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <BidAccept
          open={acceptOpen}
          onClose={() => setAcceptOpen(false)}
          data={bidsData}
        />
        <BidDecline
          open={declineOpen}
          onClose={() => setDeclineOpen(false)}
          data={bidsData}
        />
      </>
    );
  } else {
    return (
      <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Pet Owner Username</TableCell>
                <TableCell align="right">Pet Name</TableCell>
                <TableCell align="right">Pet Type</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Price ($ per day)</TableCell>
                <TableCell align="right">Transfer Method</TableCell>
                <TableCell align="right">Payment Method</TableCell>
                <TableCell align="right">Special Requirements</TableCell>
                <TableCell align="right">Accept</TableCell>
                <TableCell align="right">Decline</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <BidAccept
          open={acceptOpen}
          onClose={() => setAcceptOpen(false)}
          data={bidsData}
        />
        <BidDecline
          open={declineOpen}
          onClose={() => setDeclineOpen(false)}
          data={bidsData}
        />
      </>
    );
  }
}
