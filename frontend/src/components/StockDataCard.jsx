import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function StockDataCard({ title, value }) {
  return (
    <Card style={{ minWidth: "150px", margin: "8px" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary">{value}</Typography>
      </CardContent>
    </Card>
  );
}
