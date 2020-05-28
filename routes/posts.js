import express from 'express'

import { newPostValidator } from '../configs/validations'
import authenticate from '../middlewares/authenticate'
import uploads from '../configs/multer'
import PostControllers from '../controllers/posts'

const router = express.Router()

router.post(
	'/',
	authenticate,
	uploads.single('image_url'),
	newPostValidator,
	PostControllers.createPost
)

router.get('/feeds', authenticate, PostControllers.getFeeds)

router.delete('/:postId', authenticate, PostControllers.deletePost)

router.get('/:postId', authenticate, PostControllers.getAPost)

router.get('/', authenticate, PostControllers.getAllPosts)

export default router
