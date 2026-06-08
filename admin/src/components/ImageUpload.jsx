import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Upload, X } from 'lucide-react';
import api from '../services/api';

const ImageUpload = ({ onUploadSuccess, currentImage }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = `${import.meta.env.VITE_SERVER_BASE_URL}${response.data.url}`;
      setPreview(imageUrl);
      onUploadSuccess(imageUrl);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom color="textSecondary">
        Upload Image
      </Typography>
      <Box
        sx={{
          border: '2px dashed #e2e8f0',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          position: 'relative',
          backgroundColor: '#f8fafc',
          '&:hover': { borderColor: '#6366f1' },
        }}
      >
        {preview ? (
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} />
            <IconButton
              size="small"
              onClick={() => { setPreview(''); onUploadSuccess(''); }}
              sx={{ position: 'absolute', top: -10, right: -10, backgroundColor: 'white', boxShadow: 1 }}
            >
              <X size={16} />
            </IconButton>
          </Box>
        ) : (
          <Box component="label" sx={{ cursor: 'pointer' }}>
            <input type="file" hidden onChange={handleFileChange} accept="image/*" />
            <Upload size={32} color="#94a3b8" style={{ marginBottom: 8 }} />
            <Typography variant="body2" color="textSecondary">
              {loading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
