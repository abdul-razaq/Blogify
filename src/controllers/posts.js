import Post from '../models/Post'
import Errors from '../helpers/Errors/Errors'
import { successResponse, errorResponse } from '../helpers/responses'
import AppError from '../helpers/Errors/AppError'

export default {
	async createPost(req, res, next) {
		Errors.sendValidationError(req, next)
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

	async deletePost(req, res, next) {
		try {
			const isExist = await Post.getPost(req.params.postId)
			if (!isExist.length) throw new AppError(404, 'Post does not exist!')
			await Post.deletePost(req.userId, req.params.postId)
			successResponse(res, 200, 'Post deleted successfully!')
		} catch (error) {
			errorResponse(error, next)
		}
	},

	async getAPost(req, res, next) {
		try {
			const post = await Post.getPost(req.params.postId)
			if (!post.length) {
				throw new AppError(404, 'Post not found!')
			}
			successResponse(res, 200, 'Post found!', post)
		} catch (error) {
			errorResponse(error, next)
		}
	},

	async getAllPosts(req, res, next) {
		try {
			const posts = await Post.getAllPost(req.userId, req.query.limit || 5)
			if (!posts.length) {
				throw new AppError(404, 'This user has no post yet!')
			}
			successResponse(res, 200, 'Posts found!', posts)
		} catch (error) {
			console.log(error)
			errorResponse(error, next)
		}
	},

	async getFeeds(req, res, next) {
		try {
			const feeds = await Post.getFeeds(req.query.limit || 5)
			if (!feeds.length) {
				throw new AppError(404, 'No feeds found!')
			}
			successResponse(res, 200, 'Feeds found!', feeds)
		} catch (error) {
			errorResponse(error, next)
		}
	},
}
