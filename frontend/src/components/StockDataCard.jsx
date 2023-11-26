import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function StockDataCard({ title, value }) {
  return (
    <Card
      sx={{
        minWidth: 200,
        minHeight: 150,
        margin: 2,
        boxShadow: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary">{value}</Typography>
      </CardContent>
    </Card>
  );
}
