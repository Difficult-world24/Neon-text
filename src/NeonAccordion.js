import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function NeonAccordion(props) {
  const [expanded, setExpanded] = useState(false);
  const { options, optionToggle, accordionTitle,changeButton,buttonContained } = props;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={expanded === "panel"}
        onChange={handleChange("panel")}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{accordionTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails >
          {options.map((elem, index) => (
            <Button
              sx={{margin:1}}
              className={changeButton && elem.className}
              color={"secondary"}
              key={`${accordionTitle}-${index}`}
              onClick={() => optionToggle(elem.className)}
              variant={buttonContained ? 'contained' : 'text'}
            >
              {elem.title}
              {/* <LightbulbIcon className={elem}/> */}
            </Button>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default NeonAccordion;
