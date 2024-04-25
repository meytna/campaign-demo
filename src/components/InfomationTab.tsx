import { TextField } from "@mui/material";
import { CampaignInformation } from "../models";
import { validateRequired } from "../assets/common";

interface InformationTabProps {
  data: CampaignInformation;
  onChange: (value: CampaignInformation) => void;
  dirty?: boolean;
}

const InformationTab = (props: InformationTabProps) => {
  const handleChangeField = <K extends keyof CampaignInformation>(
    field: K,
    value: CampaignInformation[K]
  ) => {
    props.onChange({ ...props.data, [field]: value });
  };
  return (
    <section>
      <TextField
        label="Name"
        fullWidth
        required
        margin="normal"
        value={props.data.name}
        error={props.dirty && !validateRequired(props.data.name)}
        onChange={(e) => handleChangeField("name", e.target.value)}
      />
      <TextField
        label="Describe"
        fullWidth
        value={props.data.describe}
        onChange={(e) => handleChangeField("describe", e.target.value)}
      />
    </section>
  );
};

export default InformationTab;
