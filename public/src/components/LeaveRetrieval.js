import React, { useState } from "react";
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
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import { useApi } from "../hooks";

export default function LeaveRetrieval() {
  const user = useSelector(selectUser);
  const useStyles = makeStyles({});
  const [applyOpen, setLeaveApplicationOpen] = useState(false);
  const [updateOpen, setLeaveUpdatingOpen] = useState(false);
  const [deleteOpen, setLeaveDeletionOpen] = useState(false);
  const [updateDate, setUpdateDate] = useState("");
  const [deleteLeave, setDeleteLeave] = useState("");
  const leaves = useApi(
    `${API_HOST}/users/leaves/${user.username}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    },
    [applyOpen, updateOpen, deleteOpen, updateDate, deleteLeave]
  );

  const classes = useStyles();

  let today_date = new Date().toISOString().slice(0, 10);

  function calculateLeaves() {
    let count = 0;
    leaves &&
      leaves.map((leave, index) => {
        count += parseInt(leave.row.substring(23, leave.row.length - 1));
      });
    return count;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="caption">
          Number of leaves used: {calculateLeaves()}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setLeaveApplicationOpen(true)}
        >
          Apply Leave
        </Button>
      </div>
      <Table size="small" className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Number Of Days</TableCell>
            <TableCell>Update Leave</TableCell>
            <TableCell>Delete Leave</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves &&
            leaves.map((leave, i) => (
              <TableRow key={i}>
                <TableCell>{leave.row.substring(1, 11)}</TableCell>
                <TableCell>{leave.row.substring(12, 22)}</TableCell>
                <TableCell>
                  {leave.row.substring(23, leave.row.length - 1)}
                </TableCell>
                {leave.row.substring(1, 11) >= today_date ? (
                  <>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setUpdateDate(leave.row);
                          setLeaveUpdatingOpen(true);
                        }}
                      >
                        Update Leave
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setDeleteLeave(leave.row);
                          setLeaveDeletionOpen(true);
                        }}
                      >
                        Delete Leave
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>Leave Taken</TableCell>
                    <TableCell>Leave Taken</TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
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
