import React, { useState, useEffect } from "react";
import { API_HOST, PET_EMOJI } from "../consts";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { selectUser } from "../redux/slices/userSlice";
import BidCancel from "./BidCancel";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import emoji from "node-emoji";
import { useTableStyles } from "../styles";

export default function BidRetrievalPetowner(props) {
  const user = useSelector(selectUser);

  const [bids, setBids] = useState([]);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [bidsData, setData] = useState("");

  const classes = useTableStyles();

  useEffect(() => {
    async function fetchData() {
      await fetch(`${API_HOST}/petowners/bids/${user.username}`, {
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
  }, [cancelOpen, bidsData]);

  return (
    <>
      <TableContainer component={Paper} className={classes.infoCard}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headers}>
                Caretaker Username
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
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setData(bid.row);
                        setCancelOpen(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BidCancel
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        data={bidsData}
      />
    </>
  );
}
