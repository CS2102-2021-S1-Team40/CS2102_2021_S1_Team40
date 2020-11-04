import React, { useEffect, useState } from "react";
import CreditCard from "../components/CreditCard";
import AddPet from "../components/AddPet";
import AddReviewPetOwner from "../components/AddReviewPetOwner";
import PetDeletion from "../components/PetDeletion";
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
  marginTop: {
    marginTop: 16,
  },
}));

export default function PetOwnerProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const petOwnerInfo = useSelector(selectPetOwner);

  const [editCreditCardOpen, setCreditCardOpen] = useState(false);
  const [addPetOpen, setAddPetOpen] = useState(false);
  const [deletePet, setDeletePet] = useState([]);
  const [deletePetOpen, setPetDeletionOpen] = useState(false);

  const [addReviewPetOwnerOpen, setAddReviewPetOwnerOpen] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getPetOwnerBasicInfo(user.username));
    }
  }, [dispatch, user, editCreditCardOpen, addPetOpen, addReviewPetOwnerOpen, deletePet, deletePetOpen]);

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
                    <TableCell>{petOwnerInfo.username}</TableCell>
                    <TableCell>
                      {(petOwnerInfo && petOwnerInfo.card_num) || "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button variant="contained" onClick={() => setCreditCardOpen(true)}>
                        Update Card
                      </Button>
                      <CreditCard
                        open={editCreditCardOpen}
                        onClose={() => setCreditCardOpen(false)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={deleteCreditCard}>
                        Delete Card
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
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {petOwnerInfo &&
                      petOwnerInfo["pets"] &&
                      petOwnerInfo["pets"].map((pet, i) => (
                      <TableRow key={i}>
                        <TableCell>{pet["pet_name"]}</TableCell>
                        <TableCell>{pet["pet_type"]}</TableCell>
                        <TableCell>{pet["special_requirements"]}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  setDeletePet([pet["pet_name"], pet["pet_type"], pet["special_requirements"]]);
                                  setPetDeletionOpen(true);
                                }}
                              >
                                Delete Pet
                              </Button>
                              <PetDeletion
                                open={deletePetOpen}
                                onClose={() => setPetDeletionOpen(false)}
                                data={deletePet}
                              />
                            </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
                <Button className={classes.marginTop} variant="contained" onClick={() => setAddPetOpen(true)}>Add Pets</Button>
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
              Ongoing Caretakers
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pet Name</TableCell>
                  <TableCell>Caretaker Name</TableCell>
                  <TableCell>Transfer Method</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {petOwnerInfo &&
                  petOwnerInfo["ongoing"] &&
                  petOwnerInfo["ongoing"].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row["pet_name"]}</TableCell>
                      <TableCell component="th" scope="row">
                        {row["caretaker_username"]}
                      </TableCell>
                      <TableCell>{row["transfer_method"]}</TableCell>
                      <TableCell>{row["price"]}</TableCell>
                      <TableCell>
                        {moment(row["start_date"]).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(row["end_date"]).format("DD MMM YYYY")}
                      </TableCell>
                    </TableRow>
                  ))}
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
              Past Caretakers & Reviews
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pet Name</TableCell>
                  <TableCell>Caretaker</TableCell>
                  <TableCell>Transfer Method</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Review</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {petOwnerInfo &&
                  petOwnerInfo["past"] &&
                  petOwnerInfo["past"].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row["pet_name"]}</TableCell>
                      <TableCell component="th" scope="row">
                        {row["caretaker_username"]}
                      </TableCell>
                      <TableCell>{row["transfer_method"]}</TableCell>
                      <TableCell>{row["price"]}</TableCell>
                      <TableCell>
                        {moment(row["start_date"]).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(row["end_date"]).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>{(row["rating"] === null) ? '-' : row["rating"]}</TableCell>
                      <TableCell>{(row["review"] === null) ? '-' : row["review"]}</TableCell>

                      {(row["rating"] === null && row["review"] === null) ? (
                        <>
                        <TableCell>
                          <Button className={classes.marginTop} variant="contained" onClick={() => setAddReviewPetOwnerOpen(true)}>Add Reviews</Button>
                          <AddPet open={addReviewPetOwnerOpen} onClose={() => setAddReviewPetOwnerOpen(false)} />
                        </TableCell>
                        </> ) : (
                        <><TableCell></TableCell>
                        </>
                        )}

                    </TableRow>
                  ))}
              </TableBody>

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
