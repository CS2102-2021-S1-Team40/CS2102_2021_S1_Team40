import React, { useEffect, useState } from "react";
import CreditCard from "../components/CreditCard";
import AddPet from "../components/AddPet";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import {
  selectPetOwner,
  getPetOwnerBasicInfo,
} from "../redux/slices/petOwnerSlice";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

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

export default function PetOwnerProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const petOwnerInfo = useSelector(selectPetOwner);

  const [addCreditCardOpen, setCreditCardOpen] = useState(false);
  const [addPetOpen, setAddPetOpen] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getPetOwnerBasicInfo(user.username));
    }
  }, [dispatch, user, addCreditCardOpen]);

  const deleteCreditCard = () => {};

  if (user && user.type.includes("petowner")) {
    return (
      <Container>
        <h1>Your Profile as Pet Owner</h1>

        <div className={classes.infoGroup}>
          <Card style={{ flex: 1 }} className={classes.infoCard}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Basic Info
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>Credit Card</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      {(petOwnerInfo && petOwnerInfo.card_num ? "yes" : "no") ||
                        "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button onClick={() => setCreditCardOpen(true)}>
                        Update Credit Card
                      </Button>
                      <CreditCard
                        open={addCreditCardOpen}
                        onClose={() => setCreditCardOpen(false)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={deleteCreditCard}>
                        Delete Credit Card
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card style={{ flex: 2 }} className={classes.infoCard}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Pets
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pet Name</TableCell>
                    <TableCell>Pet Type</TableCell>
                    <TableCell>Special Requirements</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {petOwnerInfo &&
                    petOwnerInfo["pets"] &&
                    petOwnerInfo["pets"].map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row["pet_name"]}</TableCell>
                        <TableCell>{row["pet_type"]}</TableCell>
                        <TableCell>{row["special_requirements"]}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Button onClick={() => setAddPetOpen(true)}>Add Pets</Button>
              <AddPet open={addPetOpen} onClose={() => setAddPetOpen(false)} />
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pet Name</TableCell>
                  <TableCell>Caretaker</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Review</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {petOwnerInfo &&
                  petOwnerInfo["reviews"] &&
                  petOwnerInfo["reviews"].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row["pet_name"]}</TableCell>
                      <TableCell component="th" scope="row">
                        {row["caretaker_username"]}
                      </TableCell>
                      <TableCell>
                        {moment(row["start_date"]).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(row["end_date"]).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>{row["rating"]}</TableCell>
                      <TableCell>{row["review"]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <Button onClick={() => setCreditCardOpen(true)}>
                Add Review - To be implemented??
              </Button>
              <CreditCard
                open={addCreditCardOpen}
                onClose={() => setCreditCardOpen(false)}
              />
            </Table>
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
