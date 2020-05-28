import multer from 'multer'
import randomstring from 'randomstring'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/')
	},

	filename: (req, file, cb) => {
		cb(
			null,
			randomstring.generate({ length: 12, charset: 'alphabetic' }) +
				'_' +
				file.originalname
		)
	},
})

const allowedImages = ['image/jpeg', 'image/gif', 'image/jpg', 'image/png']
const fileFilter = (req, file, cb) => {
	if (allowedImages.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb({ message: 'Unsupported file format' }, false)
	}
}

export default multer({
	storage,
	limits: { fileSize: 1024 * 1024 },
	fileFilter,
})
