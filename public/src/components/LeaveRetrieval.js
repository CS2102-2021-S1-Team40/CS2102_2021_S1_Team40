import React, { useState } from "react";
import { API_HOST } from "../consts";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
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
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { useTableStyles } from "../styles";
import moment from "moment-timezone";

export default function LeaveRetrieval() {
  const user = useSelector(selectUser);
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
    [applyOpen, updateOpen, deleteOpen]
  );

  const classes = useTableStyles();

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
    <Card style={{ flex: 2 }} className={classes.infoCard}>
      <CardContent>
        <div className={classes.headerContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Your Leaves
          </Typography>
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
              <TableCell className={classes.headers}>Start</TableCell>
              <TableCell className={classes.headers}>End</TableCell>
              <TableCell className={classes.headers}>Number Of Days</TableCell>
              <TableCell className={classes.headers}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves &&
              leaves.map((leave, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {moment(leave.row.substring(1, 11))
                      .add(1, "days")
                      .format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell>
                    {moment(leave.row.substring(12, 22))
                      .add(1, "days")
                      .format("DD MMM YYYY")}
                  </TableCell>
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
                          style={{ marginRight: 4 }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            setDeleteLeave(leave.row);
                            setLeaveDeletionOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <TableCell>Leave Taken</TableCell>
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
      </CardContent>
    </Card>
  );
}
