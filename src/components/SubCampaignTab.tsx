import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { SubCampaign } from "../models";
import AdsTable from "./AdsTable";
import SubCampaignCard from "./SubCampaignCard";
import { validateRequired } from "../assets/common";

interface SubCampaignTabProps {
  data: SubCampaign[];
  onChange: (value: SubCampaign[]) => void;
  dirty?: boolean;
}

const SubCampaignTab = (props: SubCampaignTabProps) => {
  const [chosen, setChosen] = useState<number>(0);
  const chosenItem = props.data[chosen];

  const handleAddSubCampaign = () => {
    props.onChange([...props.data, new SubCampaign()]);
  };

  const handleChangeItem = <K extends keyof SubCampaign>(
    field: K,
    value: SubCampaign[K]
  ) => {
    props.onChange(
      props.data.map((item, index) =>
        index === chosen ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <section>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        sx={{ marginBottom: "10px" }}
        onClick={handleAddSubCampaign}
      >
        Add
      </Button>
      <Box display={"flex"} flexWrap={"wrap"} gap={"10px"}>
        {props.data.map((subCampaign, idx) => (
          <SubCampaignCard
            key={idx}
            data={subCampaign}
            active={chosen === idx}
            onClick={() => setChosen(idx)}
            dirty={props.dirty}
          />
        ))}
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyItems: "center",
          gap: "40px",
        }}
      >
        <TextField
          label="Sub Name"
          fullWidth
          required
          value={chosenItem?.name}
          error={props.dirty && !validateRequired(chosenItem?.name)}
          onChange={(e) => handleChangeItem("name", e.target.value)}
        />
        <FormControlLabel
          label="Active"
          control={
            <Checkbox
              checked={chosenItem?.status}
              onChange={() => handleChangeItem("status", !chosenItem?.status)}
            />
          }
        />
      </Box>

      <Box>
        <h1>Ads List</h1>
        <AdsTable
          data={chosenItem?.ads}
          onChange={(value) => handleChangeItem("ads", value)}
          dirty={props.dirty}
        />
      </Box>
    </section>
  );
};

export default SubCampaignTab;
