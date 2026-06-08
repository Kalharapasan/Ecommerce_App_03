import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Plus, Trash2, Edit } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import ImageUpload from '../components/ImageUpload';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', imageUrl: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateCategory(editingId, newCategory);
      } else {
        await createCategory(newCategory);
      }
      setOpen(false);
      setIsEditing(false);
      setEditingId(null);
      setNewCategory({ name: '', description: '', imageUrl: '' });
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category', error);
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setEditingId(category.id);
    setNewCategory({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Categories</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => {
            setIsEditing(false);
            setNewCategory({ name: '', description: '', imageUrl: '' });
            setOpen(true);
          }}
          sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
        >
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>
                  <img src={category.imageUrl} alt={category.name} style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" onClick={() => handleEdit(category)}><Edit size={18} /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(category.id)}><Trash2 size={18} /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent sx={{ minWidth: 400, pt: 2 }}>
          <ImageUpload
            onUploadSuccess={(url) => setNewCategory({ ...newCategory, imageUrl: url })}
            currentImage={newCategory.imageUrl}
          />
          <TextField
            fullWidth
            label="Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{isEditing ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
