import React, { useState, useEffect } from "react";
import { API_HOST, PET_EMOJI } from "../consts";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
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
import emoji from "node-emoji";
import { useTableStyles } from "../styles";

export default function BidRetrievalCaretaker(props) {
  const user = useSelector(selectUser);

  const [bids, setBids] = useState([]);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [bidsData, setData] = useState("");

  const classes = useTableStyles();

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

  return (
    <>
      <TableContainer component={Paper} className={classes.infoCard}>
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
              <TableCell className={classes.headers}>Transfer Method</TableCell>
              <TableCell className={classes.headers}>Payment Method</TableCell>
              <TableCell className={classes.headers}>
                Special Requirements
              </TableCell>
              <TableCell className={classes.headers}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bids &&
              bids.map((bid, i) => (
                <TableRow key={i}>
                  <TableCell>{bid.row.split(",")[0].split("(")[1]}</TableCell>
                  <TableCell>{bid.row.split(",")[1]}</TableCell>
                  <TableCell>{`${bid.row.split(",")[2]} ${emoji.get(
                    PET_EMOJI[bid.row.split(",")[2]]
                  )}`}</TableCell>
                  <TableCell>{bid.row.split(",")[3]}</TableCell>
                  <TableCell>{bid.row.split(",")[4]}</TableCell>
                  <TableCell>{bid.row.split(",")[5]}</TableCell>
                  <TableCell>{bid.row.split(",")[6]}</TableCell>
                  <TableCell>{bid.row.split(",")[7]}</TableCell>
                  <TableCell>{bid.row.split(",")[8].split(")")[0]}</TableCell>
                  <TableCell align="right">
                    <div className={classes.flexRow}>
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
}
