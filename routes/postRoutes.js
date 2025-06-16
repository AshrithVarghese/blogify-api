import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js'
import { getAllBlogs, getBlogById, createBlog, editBlogById, deleteBlogById } from '../controllers/postController.js'

const router = express.Router()

router.get('/all', getAllBlogs)
router.get('/:id', getBlogById)
router.post('/create', verifyToken, createBlog)
router.put('/:id', verifyToken, editBlogById)
router.delete('/:id', verifyToken, deleteBlogById)

export default router