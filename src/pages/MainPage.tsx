import { Button, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import InformationTab from "../components/InfomationTab";
import SubCampaignTab from "../components/SubCampaignTab";
import { Campaign } from "../models";
import { validatePositiveInteger, validateRequired } from "../assets/common";

const MainPage = () => {
  const [tab, setTab] = useState<keyof Campaign>("information");
  const [form, setForm] = useState<Campaign>(new Campaign());
  const [dirty, setDirty] = useState(false);

  const handleChangeField = <K extends keyof Campaign>(
    field: K,
    value: Campaign[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setDirty(true);
    try {
      if (!validateRequired(form.information.name)) {
        throw new Error("Validate!");
      }
      form.subCampaigns.forEach(({ name, ads }) => {
        if (!validateRequired(name) || ads.length <= 0) {
          throw new Error("Validate!");
        }
        ads.forEach(({ name, quantity }) => {
          if (
            !validateRequired(name) ||
            !validatePositiveInteger(String(quantity))
          ) {
            throw new Error("Validate!");
          }
        });
      });

      alert(`Success!\n${JSON.stringify({ campaign: form })}`);
    } catch (error) {
      alert("Please fill in correct and complete information!");
    }
  };
  return (
    <div>
      <nav>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab value="information" label="Information" key="information" />
          <Tab value="subCampaigns" label="Sub Campaign" key="subCampaigns" />
        </Tabs>
      </nav>

      <div style={{ marginTop: "20px" }}>
        {tab === "information" && (
          <InformationTab
            data={form.information}
            onChange={(value) => handleChangeField("information", value)}
            dirty={dirty}
          />
        )}
        {tab === "subCampaigns" && (
          <SubCampaignTab
            data={form.subCampaigns}
            onChange={(value) => handleChangeField("subCampaigns", value)}
            dirty={dirty}
          />
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
