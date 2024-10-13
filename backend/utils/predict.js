import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import asyncHandler from 'express-async-handler';

const predictDisease = asyncHandler(async (imagePath) => {
  if (imagePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(imagePath));
    const response = await axios.post('http://localhost:4000/detect', form, {
      headers: form.getHeaders(),
    });

    return response.data;
  } else {
    res.status(400);
    throw new Error('Error in disease prediction');
  }
});

export default predictDisease;
