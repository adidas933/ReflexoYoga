import React, { useState } from 'react';
import { VacationModel } from '../../../Models/VacationModel';
import { vacationService } from '../../../Services/VacationService';
import {
  Box,
  Button,
  Input,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'; // Import MUI components
import './EditVacation.css'; // Add this import

interface EditVacationFormProps {
  vacation: VacationModel;
  onClose: () => void; // Function to close the editing form
}

const EditVacationForm: React.FC<EditVacationFormProps> = ({
  vacation,
  onClose,
}) => {
  const [updatedVacation, setUpdatedVacation] =
    useState<VacationModel>(vacation);
  const [imageFile, setImageFile] = useState<File | null>(null); // State to store the selected image file
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedVacation({ ...updatedVacation, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file); // Store the selected file
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (
      !updatedVacation.destination ||
      !updatedVacation.description ||
      !updatedVacation.startDate ||
      !updatedVacation.endDate ||
      updatedVacation.price === undefined
    ) {
      setError('All fields are required except image.');
      return;
    }

    // Validate that the price is not negative or above 10,000
    if (updatedVacation.price < 0 || updatedVacation.price > 10000) {
      setError('Price must be between 0 and 10,000.');
      return;
    }

    // Validate that the end date is not before the start date
    if (
      new Date(updatedVacation.endDate) < new Date(updatedVacation.startDate)
    ) {
      setError('End date cannot be before the start date.');
      return;
    }

    // If all validations pass, submit the updated vacation
    try {
      await vacationService.editVacation(updatedVacation, imageFile);
      onClose(); // Close the form after editing
    } catch (err) {
      setError('Failed to update vacation. Please try again.');
    }
  };

  return (
    <Box
      className="EditVacation"
      sx={{ padding: 3, maxWidth: 400, margin: 'auto' }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Vacation
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Destination"
          name="destination"
          value={updatedVacation.destination}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={updatedVacation.description}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={updatedVacation.startDate.split('T')[0]}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={updatedVacation.endDate.split('T')[0]}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={updatedVacation.price}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        {/* Image upload input */}
        <InputLabel htmlFor="image-upload">Image (optional)</InputLabel>
        <Input
          id="image-upload"
          type="file"
          inputProps={{ accept: 'image/*' }}
          onChange={handleFileChange}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
          <Button type="button" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditVacationForm;
