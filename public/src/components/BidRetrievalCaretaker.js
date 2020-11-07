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

const useStyles = makeStyles({
  actions: {
    display: "flex",
    flexDirection: "row",
  },
  headers: {
    fontWeight: 800,
  },
});

export default function BidRetrievalCaretaker(props) {
  const user = useSelector(selectUser);

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
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headers}>
                  Pet Owner Username
                </TableCell>
                <TableCell className={classes.headers}>Pet Name</TableCell>
                <TableCell className={classes.headers}>Pet Type</TableCell>
                <TableCell className={classes.headers}>Start Date</TableCell>
                <TableCell className={classes.headers}>End Date</TableCell>
                <TableCell className={classes.headers}>
                  Price ($ per day)
                </TableCell>
                <TableCell className={classes.headers}>
                  Transfer Method
                </TableCell>
                <TableCell className={classes.headers}>
                  Payment Method
                </TableCell>
                <TableCell className={classes.headers}>
                  Special Requirements
                </TableCell>
                <TableCell className={classes.headers}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bids.map((bid, i) => (
                <TableRow key={i}>
                  <TableCell>{bid.row.split(",")[0].split("(")[1]}</TableCell>
                  <TableCell>{bid.row.split(",")[1]}</TableCell>
                  <TableCell>{bid.row.split(",")[2]}</TableCell>
                  <TableCell>{bid.row.split(",")[3]}</TableCell>
                  <TableCell>{bid.row.split(",")[4]}</TableCell>
                  <TableCell>{bid.row.split(",")[5]}</TableCell>
                  <TableCell>{bid.row.split(",")[6]}</TableCell>
                  <TableCell>{bid.row.split(",")[7]}</TableCell>
                  <TableCell>{bid.row.split(",")[8].split(")")[0]}</TableCell>
                  <TableCell align="right">
                    <div className={classes.actions}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setData(bid.row);
                          setAcceptOpen(true);
                        }}
                        style={{ marginRight: 4 }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setData(bid.row);
                          setDeclineOpen(true);
                        }}
                      >
                        Decline
                      </Button>
                    </div>
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
