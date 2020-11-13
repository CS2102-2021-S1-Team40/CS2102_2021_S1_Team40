import { makeStyles } from "@material-ui/core/styles";

export const useTableStyles = makeStyles((theme) => ({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  infoCard: {
    flex: 1,
    margin: 16,
    textTransform: "capitalize",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 14,
  },
  headers: {
    fontWeight: 800,
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
