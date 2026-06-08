import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem, FormControlLabel, Checkbox, Chip } from '@mui/material';
import { Plus, Trash2, Edit } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { getCategories } from '../services/categoryService';
import ImageUpload from '../components/ImageUpload';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    stockQuantity: '', 
    categoryId: '',
    imageUrls: [],
    isPopular: false,
    isUpcoming: false,
    discountPercentage: 0
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

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
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stockQuantity: parseInt(newProduct.stockQuantity)
      };

      if (isEditing) {
        await updateProduct(editingId, productData);
      } else {
        await createProduct(productData);
      }

      setOpen(false);
      setIsEditing(false);
      setEditingId(null);
      setNewProduct({ name: '', description: '', price: '', stockQuantity: '', categoryId: '', imageUrls: [] });
      fetchProducts();
    } catch (error) {
      console.error('Failed to save product', error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stockQuantity: product.stockQuantity.toString(),
      categoryId: product.categoryId,
      imageUrls: product.imageUrls,
      isPopular: product.isPopular || false,
      isUpcoming: product.isUpcoming || false,
      discountPercentage: product.discountPercentage || 0
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Products</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField 
            size="small" 
            placeholder="Search products..." 
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (query === '') {
                fetchProducts();
              } else {
                setProducts(products.filter(p => p.name.toLowerCase().includes(query)));
              }
            }}
          />
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={() => {
              setIsEditing(false);
              setNewProduct({ name: '', description: '', price: '', stockQuantity: '', categoryId: '', imageUrls: [] });
              setOpen(true);
            }}
            sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img 
                    src={product.imageUrls?.[0] || 'https://via.placeholder.com/40'} 
                    alt={product.name} 
                    style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} 
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>{product.name}</TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.stockQuantity}
                  {product.stockQuantity < 10 && (
                    <Chip label="Low" size="small" color="error" sx={{ ml: 1, height: 20, fontSize: 10 }} />
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" onClick={() => handleEdit(product)}><Edit size={18} /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(product.id)}><Trash2 size={18} /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent sx={{ minWidth: 450, pt: 2 }}>
          <ImageUpload
            onUploadSuccess={(url) => setNewProduct({ ...newProduct, imageUrls: [url] })}
            currentImage={newProduct.imageUrls?.[0]}
          />
          <TextField
            fullWidth
            label="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Category"
            value={newProduct.categoryId}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
            sx={{ mb: 2 }}
          >
            {categories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <TextField
              fullWidth
              label="Discount %"
              type="number"
              value={newProduct.discountPercentage}
              onChange={(e) => setNewProduct({ ...newProduct, discountPercentage: e.target.value })}
            />
            <TextField
              fullWidth
              label="Stock Quantity"
              type="number"
              value={newProduct.stockQuantity}
              onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={newProduct.isPopular} onChange={(e) => setNewProduct({ ...newProduct, isPopular: e.target.checked })} />}
              label="Mark as Popular"
            />
            <FormControlLabel
              control={<Checkbox checked={newProduct.isUpcoming} onChange={(e) => setNewProduct({ ...newProduct, isUpcoming: e.target.checked })} />}
              label="Mark as Upcoming Sale"
            />
          </Box>
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ position: 'absolute', right: 8, bottom: 24, fontSize: '10px' }}
              onClick={() => {
                const mockDescriptions = [
                  `Experience the ultimate ${newProduct.name}. Designed for high performance and style.`,
                  `The new ${newProduct.name} is a game-changer in its category. Get yours today!`,
                  `Unmatched quality and durability with the latest ${newProduct.name}. A must-have for everyone.`
                ];
                setNewProduct({ 
                  ...newProduct, 
                  description: mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)] 
                });
              }}
            >
              AI Generate
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{isEditing ? 'Update Product' : 'Create Product'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
