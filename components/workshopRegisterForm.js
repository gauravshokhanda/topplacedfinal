// components/WorkshopRegisterForm.js
"use client";

import React, { useState } from "react";
import { API } from "../app/config/apiConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, Grid, Box, TextField, Button, Typography } from "@mui/material";

const WorkshopRegisterForm = ({ workshopId }) => {
  const [email, setEmail] = useState("");
  const [whatsapp, setwhatsapp] = useState("");
  const [fullName, setfullName] = useState("");
  const [plan, setPlan] = useState("19");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const workshopDate = "15 Apr 2025";
  const workshopTime = "10:00 AM IST";

  const validateForm = () => {
    let newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "fullName is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!/^\d{10}$/.test(whatsapp)) {
      newErrors.whatsapp = "Enter a valid 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    const registrationData = {
      fullName,
      email,
      whatsapp,
      workshopId,
      payment: Number(plan), // send the selected plan to backend
    };
    
  
    setLoading(true);
    try {
      // Step 1: Call backend to create Razorpay order
      const { data } = await API.post("workshops/register", registrationData);
      const { order, participantInfo } = data;
  
      // Step 2: Load Razorpay script dynamically
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay. Please try again.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "TopPlaced Workshop",
        description: `Workshop Plan - ₹${plan}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const confirmData = {
              fullName: participantInfo.fullName,
              email: participantInfo.email,
              whatsapp: participantInfo.whatsapp,
              workshopId: participantInfo.workshopId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
  
            await API.post("workshops/confirm-registration", confirmData);
            toast.success("Payment successful! You are registered.");
            setfullName("");
            setEmail("");
            setwhatsapp("");
            setPlan("19");
            setErrors({});
          } catch (err) {
            console.error("Error confirming registration:", err);
            toast.error("Payment was successful, but registration failed.");
          }
        },
        prefill: {
          name: participantInfo.fullName,
          email: participantInfo.email,
          contact: participantInfo.whatsapp,
        },
        theme: {
          color: "#0A6E6E",
        },
      };
  
      // Step 4: Open Razorpay payment popup
      const razorpay = new window.Razorpay(options);
      razorpay.open();
  
    } catch (error) {
      console.error("Error registering for workshop:", error);
      toast.error(error.response?.data?.message || "Failed to initiate registration");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={6}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "flex-start", md: "center" },
        minHeight: { xs: "auto", md: "100vh" },
        p: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          width: "100%",
          maxWidth: 500,
          backgroundColor: "#fff",
          m: "auto",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1A3C34",
              letterSpacing: "0.5px",
              textAlign: "center",
            }}
          >
            Register for the Workshop
          </Typography>



          {/* fullName Field */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#666", fontWeight: "medium", mb: 0.5 }}>
              fullName
            </Typography>
            <TextField
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              fullWidth
              placeholder="Enter your fullName"
              error={!!errors.fullName}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#F9FAFB",
                  "& fieldset": { borderColor: "#E0E0E0" },
                  "&:hover fieldset": { borderColor: "#B0B0B0" },
                  "&.Mui-focused fieldset": { borderColor: "#0A6E6E" },
                },
              }}
            />
            {errors.fullName && (
              <Typography sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>{errors.fullName}</Typography>
            )}
          </Box>

          {/* Email Field */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#666", fontWeight: "medium", mb: 0.5 }}>
              Email
            </Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              placeholder="Enter your email"
              type="email"
              error={!!errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#F9FAFB",
                  "& fieldset": { borderColor: "#E0E0E0" },
                  "&:hover fieldset": { borderColor: "#B0B0B0" },
                  "&.Mui-focused fieldset": { borderColor: "#0A6E6E" },
                },
              }}
            />
            {errors.email && (
              <Typography sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>{errors.email}</Typography>
            )}
          </Box>

          {/* WhatsApp Number Field */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#666", fontWeight: "medium", mb: 0.5 }}>
              WhatsApp Number
            </Typography>
            <TextField
              value={whatsapp}
              onChange={(e) => setwhatsapp(e.target.value)}
              fullWidth
              placeholder="Enter your WhatsApp number"
              type="tel"
              error={!!errors.whatsapp}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#F9FAFB",
                  "& fieldset": { borderColor: "#E0E0E0" },
                  "&:hover fieldset": { borderColor: "#B0B0B0" },
                  "&.Mui-focused fieldset": { borderColor: "#0A6E6E" },
                },
              }}
            />
            {errors.whatsapp && (
              <Typography sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>
                {errors.whatsapp}
              </Typography>
            )}
          </Box>

          {/* Plan Selection with Buttons */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#666", fontWeight: "medium", mb: 1 }}>
              Select Plan
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {["19", "49", "99"].map((price) => (
                <Button
                  key={price}
                  variant={plan === price ? "contained" : "outlined"}
                  onClick={() => setPlan(price)}
                  sx={{
                    flex: { xs: "1 1 30%", sm: "0 1 auto" },
                    minWidth: { xs: "80px", sm: "90px" },
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: "medium",
                    backgroundColor: plan === price ? "#0A6E6E" : "transparent",
                    color: plan === price ? "#fff" : "#333",
                    borderColor: plan === price ? "#0A6E6E" : "#E0E0E0",
                    "&:hover": {
                      backgroundColor: plan === price ? "#085858" : "#F5F7FA",
                      borderColor: plan === price ? "#085858" : "#B0B0B0",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Rs {price}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Confirm Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#0A6E6E",
              color: "#fff",
              borderRadius: "12px",
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#085858" },
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Confirm Registration
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WorkshopRegisterForm;