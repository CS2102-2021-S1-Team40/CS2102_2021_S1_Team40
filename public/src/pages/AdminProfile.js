import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { API_HOST, MONTH_ARRAY } from "../consts";
import { useApi } from "../hooks";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import NewBasePrice from "../components/NewBasePrice";
import EditBasePrice from "../components/EditBasePrice";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
  emptyText: {
    margin: "auto",
    paddingTop: 16,
  },
  aggregateInfo: {},
  chipPrice: {
    textTransform: "capitalize",
    margin: 4,
  },
  headers: {
    fontWeight: 800,
  },
}));

export default function AdminProfile() {
  const user = useSelector(selectUser);
  const [page, setPage] = useState("ft");
  const [editInfo, setEditInfo] = useState(null);
  const [newPriceOpen, setNewPriceOpen] = useState(false);
  const [targetCtUsername, setTargetCtUsername] = useState(null);
  const classes = useStyles();
  const adminProfileInfo = useApi(
    `${API_HOST}/caretakers/admin`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: user.username,
      }),
    },
    [editInfo, newPriceOpen]
  );
  const [search, setSearch] = useState("");
  const formatter = new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  });
  const ftcaretakerInfo = adminProfileInfo
    ? adminProfileInfo["caretakers_ft"]
    : [];
  const ptcaretakerInfo = adminProfileInfo
    ? adminProfileInfo["caretakers_pt"]
    : [];
  const underperfCaretaker = adminProfileInfo
    ? adminProfileInfo["caretakers_up"]
    : [];
  const totalSalary = adminProfileInfo ? adminProfileInfo["total_salary"] : 0;
  if (user && user.type.includes("admin")) {
    const searchAndSelect = (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl color="secondary" style={{ margin: "0 16px" }}>
          <InputLabel id="select-ct-input">Type</InputLabel>
          <Select
            label="Type"
            labelId="select-ct-input"
            id="select-ct-type"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          >
            <MenuItem value="ft">Full Time Caretakers</MenuItem>
            <MenuItem value="pt">Part Time Caretakers</MenuItem>
            <MenuItem value="up">Under Performing Caretakers</MenuItem>
          </Select>
        </FormControl>
        <TextField
          color="secondary"
          id="admin_search"
          label="Search by Username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
    return (
      <Container>
        <h1>Admin Profile</h1>
        <div className={classes.aggregateInfo}>
          <h2>At a glance...</h2>
          <h4>
            Total Salary to be Paid ({MONTH_ARRAY[new Date().getMonth()]}):{" "}
            {formatter.format(totalSalary)}
          </h4>
          <h4>
            Number of Jobs ({MONTH_ARRAY[new Date().getMonth()]}):{" "}
            {adminProfileInfo && adminProfileInfo["admin_agg_info"]["num_jobs"]}{" "}
            Jobs
          </h4>
        </div>
        <Card hidden={page !== "ft"} className={classes.infoCard}>
          <CardContent>
            {searchAndSelect}
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headers}>Username</TableCell>
                  <TableCell className={classes.headers}>
                    Number of Pets Cared For (
                    {MONTH_ARRAY[new Date().getMonth()]})
                  </TableCell>
                  <TableCell className={classes.headers}>
                    Salary to be Paid ({MONTH_ARRAY[new Date().getMonth()]})
                  </TableCell>
                  <TableCell className={classes.headers}>Base Prices</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ftcaretakerInfo &&
                  ftcaretakerInfo
                    .filter((r) => r["username"].includes(search))
                    .map((row, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {row["username"]}
                        </TableCell>
                        <TableCell>{row["num_pets"]}</TableCell>
                        <TableCell>{row["salary"]}</TableCell>
                        <TableCell style={{ maxWidth: 384 }}>
                          {row["base_prices"] &&
                            row["base_prices"].map((bp, i) => (
                              <Chip
                                key={i}
                                color="secondary"
                                className={classes.chipPrice}
                                label={`${bp["pet_type"]}: $${bp["base_price"]}`}
                                onDelete={() => {
                                  setTargetCtUsername(row["username"]);
                                  setEditInfo({
                                    pet_type: bp["pet_type"],
                                    base_price: bp["base_price"],
                                  });
                                }}
                                deleteIcon={<EditIcon />}
                              />
                            ))}
                          <IconButton
                            onClick={() => {
                              setTargetCtUsername(row["username"]);
                              setNewPriceOpen(true);
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            {!ftcaretakerInfo && (
              <Typography
                component="span"
                className={classes.emptyText}
                color="textSecondary"
              >
                You have no full-time caretakers.
              </Typography>
            )}
          </CardContent>
        </Card>

        <Card hidden={page !== "pt"} className={classes.infoCard}>
          <CardContent>
            {searchAndSelect}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>
                    Number of Pets Cared For (
                    {MONTH_ARRAY[new Date().getMonth()]})
                  </TableCell>
                  <TableCell>
                    Salary to be Paid ({MONTH_ARRAY[new Date().getMonth()]})
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ptcaretakerInfo &&
                  ptcaretakerInfo.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {row["username"]}
                      </TableCell>
                      <TableCell>{row["num_pets"]}</TableCell>
                      <TableCell>{row["salary"]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {!ptcaretakerInfo && (
              <Typography className={classes.emptyText} color="textSecondary">
                You have no part-time caretakers.
              </Typography>
            )}
          </CardContent>
        </Card>

        <Card hidden={page !== "up"} className={classes.infoCard}>
          <CardContent>
            {searchAndSelect}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>
                    Number of Pets Cared For (
                    {MONTH_ARRAY[new Date().getMonth()]})
                  </TableCell>
                  <TableCell>
                    Salary to be Paid ({MONTH_ARRAY[new Date().getMonth()]})
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {underperfCaretaker &&
                  underperfCaretaker.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {row["username"]}
                      </TableCell>
                      <TableCell>{row["num_pets"]}</TableCell>
                      <TableCell>{row["salary"]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {!underperfCaretaker && (
              <Typography className={classes.emptyText} color="textSecondary">
                You have no under-performing caretakers.
              </Typography>
            )}
          </CardContent>
        </Card>
        <NewBasePrice
          open={newPriceOpen}
          onClose={() => setNewPriceOpen(false)}
          username={targetCtUsername}
        />
        <EditBasePrice
          open={editInfo !== null}
          editInfo={editInfo}
          onClose={() => setEditInfo(null)}
          username={targetCtUsername}
        />
      </Container>
    );
  }
  return (
    <Container>
      <h1>You are not an admin!</h1>
    </Container>
  );
}
