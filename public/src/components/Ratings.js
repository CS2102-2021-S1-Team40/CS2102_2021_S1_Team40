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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { selectCareTaker } from "../redux/slices/careTakerSlice";

export default function Ratings(props) {
    const { open, onClose, caretaker } = props;

    const ratings = useSelector(selectCareTaker);



    if (Array.isArray(ratings)) {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Reviews page</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ratings and reviews of this caretaker:
                    </DialogContentText>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="caretakers-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Rating</TableCell>
                                    <TableCell align="center">Review</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ratings.map((rating, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="center">{rating["rating"]}</TableCell>
                                        <TableCell align="center">
                                            {rating["review"]}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    } else {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Bid page</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter these information before bidding
                    </DialogContentText>
                    <Table stickyHeader aria-label="caretakers-table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Rating</TableCell>
                                <TableCell align="center">Review</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={bid}>Bid</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
