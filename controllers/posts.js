import Post from '../models/Post'
import Errors from '../helpers/Errors/Errors'
import { successResponse, errorResponse } from '../helpers/responses'

export default {
	async createPost(req, res, next) {
		Errors.sendValidationError(req)
		try {
			const { title, content, category } = req.body
			const post = new Post(title, content, req.file.path, req.userId, category)
			const postId = await post.save()
			const createdPost = await Post.getPost(postId)
      successResponse(res, 201, 'Post created successfully!', createdPost)
		} catch (error) {
      errorResponse(error, next)
    }
	},
}
