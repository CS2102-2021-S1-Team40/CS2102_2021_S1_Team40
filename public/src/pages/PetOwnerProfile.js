import React, { useEffect, useState } from "react";
import AddPet from "../components/AddPet";
import CreditCardDeletion from "../components/CreditCardDeletion";
import DeleteReviewPetOwner from "../components/DeleteReviewPetOwner";
import UpdateCreditCard from "../components/UpdateCreditCard";
import UpdateReviewPetOwner from "../components/UpdateReviewPetOwner";
import PetDeletion from "../components/PetDeletion";
import PetUpdating from "../components/PetUpdating";
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
import moment from "moment";
import emoji from "node-emoji";
import { PET_EMOJI } from "../consts";
import { useTableStyles } from "../styles";

export default function PetOwnerProfile() {
  const classes = useTableStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const petOwnerInfo = useSelector(selectPetOwner);

  const [editCreditCardOpen, setCreditCardOpen] = useState(false);
  const [deleteCreditCard, setDeleteCreditCard] = useState([]);
  const [deleteCreditCardOpen, setCreditCardDeletionOpen] = useState(false);

  const [addPetOpen, setAddPetOpen] = useState(false);
  const [editPet, setEditPet] = useState([]);
  const [editPetOpen, setPetEditOpen] = useState(false);
  const [deletePet, setDeletePet] = useState([]);
  const [deletePetOpen, setPetDeletionOpen] = useState(false);

  const [updateReview, setUpdateReview] = useState([]);
  const [updateReviewPetOwnerOpen, setUpdateReviewPetOwnerOpen] = useState(
    false
  );
  const [deleteReview, setDeleteReview] = useState([]);
  const [deleteReviewPetOwnerOpen, setDeleteReviewPetOwnerOpen] = useState(
    false
  );

  useEffect(() => {
    if (user) {
      dispatch(getPetOwnerBasicInfo(user.username));
    }
  }, [
    editCreditCardOpen,
    deleteCreditCardOpen,
    addPetOpen,
    editPet,
    deletePetOpen,
    updateReviewPetOwnerOpen,
    deleteReviewPetOwnerOpen,
  ]);

  if (user && user.type.includes("petowner")) {
    return (
      <Container>
        <h1>Your Profile as Pet Owner</h1>
        <div className={classes.flexRow}>
          <Card style={{ flex: 1 }} className={classes.infoCard}>
            <CardContent>
              <div className={classes.headerContent}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Basic Info
                </Typography>
                {petOwnerInfo && petOwnerInfo.card_num > 0 ? (
                  <>
                    <Button
                      variant="outlined"
                      onClick={() => setCreditCardOpen(true)}
                    >
                      Update Card
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setCreditCardDeletionOpen(true)}
                    >
                      Delete Card
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setCreditCardOpen(true)}
                  >
                    Add Credit Card
                  </Button>
                )}
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headers}>User Name</TableCell>
                    <TableCell className={classes.headers}>
                      Credit Card
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      {petOwnerInfo && petOwnerInfo.card_num > 0
                        ? petOwnerInfo.card_num
                        : "-"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card style={{ flex: 2 }} className={classes.infoCard}>
            <CardContent>
              <div className={classes.headerContent}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Pets
                </Typography>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => setAddPetOpen(true)}
                >
                  Add New Pet
                </Button>
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headers}>Pet Name</TableCell>
                    <TableCell className={classes.headers}>Pet Type</TableCell>
                    <TableCell className={classes.headers}>
                      Special Requirements
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {petOwnerInfo &&
                    petOwnerInfo["pets"] &&
                    petOwnerInfo["pets"].map((pet, i) => (
                      <TableRow key={i}>
                        <TableCell>{pet["pet_name"]}</TableCell>
                        <TableCell>{`${pet["pet_type"]} ${emoji.get(
                          PET_EMOJI[pet["pet_type"]]
                        )}`}</TableCell>
                        <TableCell>
                          {pet["special_requirements"]
                            ? pet["special_requirements"]
                            : "-"}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              setEditPet([
                                pet["pet_name"],
                                pet["pet_type"],
                                pet["special_requirements"],
                              ]);
                              setPetEditOpen(true);
                            }}
                          >
                            Edit Requirements
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              setDeletePet([
                                pet["pet_name"],
                                pet["pet_type"],
                                pet["special_requirements"],
                              ]);
                              setPetDeletionOpen(true);
                            }}
                          >
                            Delete Pet
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
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
              Ongoing & Future Caretakers
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headers}>Pet Name</TableCell>
                  <TableCell className={classes.headers}>
                    Caretaker Name
                  </TableCell>
                  <TableCell className={classes.headers}>
                    Transfer Method
                  </TableCell>
                  <TableCell className={classes.headers}>Price</TableCell>
                  <TableCell className={classes.headers}>Start Date</TableCell>
                  <TableCell className={classes.headers}>End Date</TableCell>
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
                      <TableCell>{"S$ " + row["price"]}</TableCell>
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
                  <TableCell className={classes.headers}>Pet Name</TableCell>
                  <TableCell className={classes.headers}>Caretaker</TableCell>
                  <TableCell className={classes.headers}>
                    Transfer Method
                  </TableCell>
                  <TableCell className={classes.headers}>Price</TableCell>
                  <TableCell className={classes.headers}>Start Date</TableCell>
                  <TableCell className={classes.headers}>End Date</TableCell>
                  <TableCell className={classes.headers}>Rating</TableCell>
                  <TableCell className={classes.headers}>Review</TableCell>
                  <TableCell />
                  <TableCell />
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
                      <TableCell>{"S$ " + row["price"]}</TableCell>
                      <TableCell>
                        {moment(row["start_date"]).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(row["end_date"]).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {row["rating"] === null ||
                        (row["rating"] === 0 && row["review"] === "")
                          ? "-"
                          : row["rating"]}
                      </TableCell>
                      <TableCell>
                        {row["review"] === null ||
                        (row["rating"] === 0 && row["review"] === "")
                          ? "-"
                          : row["review"]}
                      </TableCell>

                      {(row["rating"] === null && row["review"] === null) ||
                      (row["rating"] === 0 && row["review"] === "") ? (
                        <>
                          <TableCell>
                            <Button
                              className={classes.marginTop}
                              color="secondary"
                              variant="outlined"
                              onClick={() => {
                                setUpdateReview([
                                  user.username,
                                  row["pet_name"],
                                  row["caretaker_username"],
                                  row["start_date"],
                                  row["end_date"],
                                ]);
                                setUpdateReviewPetOwnerOpen(true);
                              }}
                            >
                              Add Review
                            </Button>
                            <UpdateReviewPetOwner
                              open={updateReviewPetOwnerOpen}
                              onClose={() => setUpdateReviewPetOwnerOpen(false)}
                              data={updateReview}
                            />
                          </TableCell>
                          <TableCell />
                        </>
                      ) : (
                        <>
                          <TableCell>
                            <Button
                              className={classes.marginTop}
                              color="secondary"
                              variant="outlined"
                              onClick={() => {
                                setUpdateReview([
                                  user.username,
                                  row["pet_name"],
                                  row["caretaker_username"],
                                  row["start_date"],
                                  row["end_date"],
                                ]);
                                setUpdateReviewPetOwnerOpen(true);
                              }}
                            >
                              Edit Review
                            </Button>
                            <UpdateReviewPetOwner
                              open={updateReviewPetOwnerOpen}
                              onClose={() => setUpdateReviewPetOwnerOpen(false)}
                              data={updateReview}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              className={classes.marginTop}
                              variant="outlined"
                              onClick={() => {
                                setDeleteReview([
                                  user.username,
                                  row["pet_name"],
                                  row["caretaker_username"],
                                  row["start_date"],
                                  row["end_date"],
                                  row["rating"],
                                  row["review"],
                                ]);
                                setDeleteReviewPetOwnerOpen(true);
                              }}
                            >
                              Delete Review
                            </Button>
                            <DeleteReviewPetOwner
                              open={deleteReviewPetOwnerOpen}
                              onClose={() => setDeleteReviewPetOwnerOpen(false)}
                              data={deleteReview}
                            />
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <UpdateCreditCard
          open={editCreditCardOpen}
          onClose={() => setCreditCardOpen(false)}
        />
        <CreditCardDeletion
          open={deleteCreditCardOpen}
          onClose={() => setCreditCardDeletionOpen(false)}
          data={deleteCreditCard}
        />
        <PetUpdating
          open={editPetOpen}
          onClose={() => setPetEditOpen(false)}
          data={editPet}
        />
        <PetDeletion
          open={deletePetOpen}
          onClose={() => setPetDeletionOpen(false)}
          data={deletePet}
        />
      </Container>
    );
  }
  return (
    <Container>
      <h1>You are not a Pet Owner yet! Please register to be one!</h1>
    </Container>
  );
}
