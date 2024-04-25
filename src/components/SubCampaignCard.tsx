import { Box, Card, Typography } from "@mui/material";
import { SubCampaign } from "../models";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCallback } from "react";
import { validatePositiveInteger, validateRequired } from "../assets/common";

interface SubCampaignCardProps {
  data: SubCampaign;
  active?: boolean;
  dirty?: boolean;
  onClick: () => void;
}

const SubCampaignCard = (props: SubCampaignCardProps) => {
  const validateCard = useCallback(() => {
    return (
      validateRequired(props.data.name) &&
      props.data.ads.length > 0 &&
      props.data.ads.every(
        (a) =>
          validateRequired(a.name) &&
          validatePositiveInteger(String(a.quantity))
      )
    );
  }, [props.data]);
  return (
    <Card
      variant="outlined"
      sx={{ padding: "10px", width: "240px", height: "120px" }}
      onClick={props.onClick}
      style={{ cursor: "pointer", borderColor: props.active ? "blue" : "gray" }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
      >
        <Typography
          variant="h6"
          sx={{
            color: props.dirty && !validateCard() ? "red" : "black",
          }}
        >
          {props.data.name}
        </Typography>
        {props.data.status && <CheckCircleIcon color="success" />}
      </Box>
      <Typography>{props.data.ads.length}</Typography>
    </Card>
  );
};

export default SubCampaignCard;
