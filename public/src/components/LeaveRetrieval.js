import React, { useState, useEffect } from "react";
import { API_HOST } from "../consts";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { selectUser } from "../redux/slices/userSlice";
import LeaveApplication from "./LeaveApplication";
import LeaveDeletion from "./LeaveDeletion";
import LeaveUpdating from "./LeaveUpdating";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function LeaveRetrieval(props) {
  const user = useSelector(selectUser);
  const useStyles = makeStyles({
    auth: {
      marginLeft: "auto",
    },
  });

  const [leaves, setLeaves] = useState([]);
  const [applyOpen, setLeaveApplicationOpen] = useState(false);
  const [updateOpen, setLeaveUpdatingOpen] = useState(false);
  const [deleteOpen, setLeaveDeletionOpen] = useState(false);
  const [updateDate, setUpdateDate] = useState("");
  const [deleteLeave, setDeleteLeave] = useState("");

  const classes = useStyles();

  let today_date = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    async function fetchData() {
      await fetch(`${API_HOST}/users/leaves/${user.username}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status === "success") {
            await setLeaves(result.data);
          } else {
            console.log("No leaves found");
            await setLeaves(null);
          }
        })
        .catch((err) => alert(err));
    }
    fetchData();
  }, [applyOpen, updateOpen, deleteOpen, updateDate, deleteLeave]);

  const applyButton = (
    <div className={classes.auth}>
      <Button variant="contained" onClick={() => setLeaveApplicationOpen(true)}>
        Apply Leave
      </Button>
    </div>
  );

  function calculateLeaves() {
    var count = 0;
    leaves.map((leave, index) => {
      count += parseInt(leave.row.substring(23, leave.row.length - 1));
    });
    return count;
  }

  if (leaves != null) {
    return (
      <>
        <h2>Number of leaves used: {calculateLeaves()}</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Start</TableCell>
                <TableCell align="right">End</TableCell>
                <TableCell align="right">Number Of Days</TableCell>
                <TableCell align="right">Update Leave</TableCell>
                <TableCell align="right">Delete Leave</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave, i) => (
                <TableRow key={i}>
                  <TableCell align="right">
                    {leave.row.substring(1, 11)}
                  </TableCell>
                  <TableCell align="right">
                    {leave.row.substring(12, 22)}
                  </TableCell>
                  <TableCell align="right">
                    {leave.row.substring(23, leave.row.length - 1)}
                  </TableCell>
                    {(leave.row.substring(1, 11) >= today_date) ?
                      <>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            onClick={() => {
                              setUpdateDate(leave.row);
                              setLeaveUpdatingOpen(true);
                            }}
                          >
                            Update Leave
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            onClick={() => {
                              setDeleteLeave(leave.row);
                              setLeaveDeletionOpen(true);
                            }}
                          >
                            Delete Leave
                          </Button>
                        </TableCell>
                      </>
                    : 
                    <>
                        <TableCell align="right">
                            Leave Taken
                        </TableCell>
                        <TableCell align="right">
                            Leave Taken
                        </TableCell>
                      </>
                    }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {applyButton}
        <LeaveUpdating
          open={updateOpen}
          onClose={() => setLeaveUpdatingOpen(false)}
          data={updateDate}
        />
        <LeaveApplication
          open={applyOpen}
          onClose={() => setLeaveApplicationOpen(false)}
        />
        <LeaveDeletion
          open={deleteOpen}
          onClose={() => setLeaveDeletionOpen(false)}
          data={deleteLeave}
        />
      </>
    );
  } else {
    return (
      <>
        <h2>Number of leaves used: 0</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Start</TableCell>
                <TableCell align="right">End</TableCell>
                <TableCell align="right">Number Of Days</TableCell>
                <TableCell align="right">Update Leave</TableCell>
                <TableCell align="right">Delete Leave</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        {applyButton}
        <LeaveUpdating
          open={updateOpen}
          onClose={() => setLeaveUpdatingOpen(false)}
          data={updateDate}
        />
        <LeaveApplication
          open={applyOpen}
          onClose={() => setLeaveApplicationOpen(false)}
        />
        <LeaveDeletion
          open={deleteOpen}
          onClose={() => setLeaveDeletionOpen(false)}
          data={deleteLeave}
        />
      </>
    );
  }
}
