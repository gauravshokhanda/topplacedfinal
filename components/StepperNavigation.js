import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";

export default function StepperNavigation({ activeStep, setActiveStep, handleSubmit, steps }) {
  return (
    <Box>
      {/* Vertical Stepper */}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        {activeStep > 0 && (
          <Button variant="outlined" onClick={() => setActiveStep(activeStep - 1)}>
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={() => setActiveStep(activeStep + 1)}>
            Next
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Confirm Booking
          </Button>
        )}
      </Box>
    </Box>
  );
}
