import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  selectPetOwner,
} from "../redux/slices/petOwnerSlice";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { MONTH_ARRAY } from "../consts";

const useStyles = makeStyles((theme) => ({
  infoGroup: {
    display: "flex",
    flexDirection: "row",
  },
  infoCard: {
    flex: 1,
    margin: 16,
  },
  title: {
    fontSize: 14,
  },
}));

function PetOwnerProfile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const petOwnerInfo = useSelector(selectPetOwner);

  const classes = useStyles();
  if (user && user.type.includes("petowner")) {
    return (
      <Container>
        <h1>Your Profile as Pet Owner</h1>
        <Button>Add New Pet</Button>
        <div className={classes.infoGroup}>
          <Card className={classes.infoCard}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Basic Info
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Credit Card
                    </TableCell>
                    <TableCell>
                      **** ****
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className={classes.infoCard}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Pets
              </Typography>

              <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Pet Name</TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pet Type</TableCell>
                  <TableCell>
                    {petOwnerInfo && petOwnerInfo["job_type"]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Special Requirements
                  </TableCell>
                  <TableCell>
                    N.A.
                  </TableCell>
                </TableRow>
              </TableBody>
              </Table>
              <Button>Add New Pet</Button>
            </CardContent>
          </Card>
        </div>
        <Card className={classes.infoCard}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Reviews
            </Typography>
            <Button>Add Review</Button>
          </CardContent>
        </Card>
      </Container>
    );
  }
  return (
    <Container>
      <h1>You are not a Pet Owner yet! Please register to be one!</h1>
    </Container>
  );
}

export default PetOwnerProfile;
