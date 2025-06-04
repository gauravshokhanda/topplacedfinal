"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

const WorkshopForm = ({ open, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    workshopName: "",
    dateTime: "",
    meetingLink: "",
    price: 19.49,
    whatYoullLearn: [""],
    description: "",
    coverImage: "",
    coverImageFile: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        workshopName: initialData.workshopName || "",
        dateTime: initialData.dateTime
          ? new Date(initialData.dateTime).toISOString().slice(0, 16)
          : "",
        meetingLink: initialData.meetingLink || "",
        price: initialData.price || 19.49,
        description: initialData.description || "",
        whatYoullLearn:
          initialData.whatYoullLearn?.length > 0
            ? initialData.whatYoullLearn
            : [""],
        coverImage: initialData.coverImage || "",
        coverImageFile: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageValidation = (file) => {
    if (!ALLOWED_FORMATS.includes(file.type)) {
      return "Only JPG, PNG, or WEBP images are allowed.";
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `File size should be under ${MAX_FILE_SIZE_MB}MB.`;
    }
    return "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = handleImageValidation(file);
      if (error) return setImageError(error);
      setImageError("");
      setFormData((prev) => ({ ...prev, coverImageFile: file }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const error = handleImageValidation(file);
      if (error) return setImageError(error);
      setImageError("");
      setFormData((prev) => ({ ...prev, coverImageFile: file }));
    }
  };

  const handleLearnPointChange = (index, value) => {
    const newLearnPoints = [...formData.whatYoullLearn];
    newLearnPoints[index] = value;
    setFormData((prev) => ({ ...prev, whatYoullLearn: newLearnPoints }));
  };

  const addLearnPoint = () => {
    setFormData((prev) => ({
      ...prev,
      whatYoullLearn: [...prev.whatYoullLearn, ""],
    }));
  };

  const removeLearnPoint = (index) => {
    if (formData.whatYoullLearn.length > 1) {
      const newLearnPoints = formData.whatYoullLearn.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({ ...prev, whatYoullLearn: newLearnPoints }));
    }
  };

  const handleSubmit = () => {
    const cleanedPoints = formData.whatYoullLearn.filter(
      (point) => point.trim() !== ""
    );
    if (cleanedPoints.length === 0) {
      alert("Please provide at least one learning point.");
      return;
    }

    const payload = new FormData();
    payload.append("workshopName", formData.workshopName);
    payload.append("dateTime", formData.dateTime);
    payload.append("meetingLink", formData.meetingLink);
    payload.append("price", formData.price);
    payload.append("description", formData.description);
    cleanedPoints.forEach((point, index) =>
      payload.append(`whatYoullLearn[${index}]`, point)
    );

    if (formData.coverImageFile) {
      payload.append("coverImage", formData.coverImageFile);
    }

    onSubmit(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData._id ? "Update Workshop" : "Create Workshop"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField label="Workshop Name" name="workshopName" value={formData.workshopName} onChange={handleChange} fullWidth required />
          <TextField label="Date and Time" name="dateTime" type="datetime-local" value={formData.dateTime} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
          <TextField label="Meeting Link" name="meetingLink" value={formData.meetingLink} onChange={handleChange} fullWidth required />
          <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth required inputProps={{ step: "0.01" }} />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth multiline minRows={2} />

          <Box
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            sx={{
              border: dragActive ? "2px dashed #106861" : "2px dashed #ccc",
              padding: 2,
              borderRadius: 2,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              Drag and drop your cover image here, or click to upload
            </Typography>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="coverImageUpload"
              onChange={handleFileChange}
            />
            <label htmlFor="coverImageUpload">
              <Button variant="outlined" component="span" sx={{ mt: 1 }}>Browse</Button>
            </label>
            {imageError && (
              <Typography color="error" variant="caption">{imageError}</Typography>
            )}
          </Box>

          {(formData.coverImage || formData.coverImageFile) && (
            <Box mt={1}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {formData.coverImageFile ? "New Image Preview:" : "Current Uploaded Image:"}
              </Typography>
              <img
                src={formData.coverImageFile ? URL.createObjectURL(formData.coverImageFile) : formData.coverImage}
                alt="Preview"
                style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 8, border: "1px solid #ccc" }}
              />
            </Box>
          )}

          <Box>
            <Typography variant="subtitle1">What You'll Learn</Typography>
            {formData.whatYoullLearn.map((point, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <TextField
                  label={`Learning Point ${index + 1}`}
                  value={point}
                  onChange={(e) => handleLearnPointChange(index, e.target.value)}
                  fullWidth required
                />
                <IconButton onClick={() => removeLearnPoint(index)} disabled={formData.whatYoullLearn.length === 1}>
                  <Remove />
                </IconButton>
                {index === formData.whatYoullLearn.length - 1 && (
                  <IconButton onClick={addLearnPoint}>
                    <Add />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {initialData._id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkshopForm;
