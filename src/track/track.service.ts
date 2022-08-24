import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Track, TrackDocument } from '@app/track/schemas/track.schema'
import { Model, ObjectId } from 'mongoose'
import { Comment } from '@app/track/schemas/comment.schema'
import { CreateTrackDto } from '@app/track/dto/create-track.dto'
import { CreateCommentDto } from '@app/track/dto/create-comment.dto'
import { FileService, FileType } from '@app/file/file.service'

@Injectable()
export class TrackService {
	constructor(
		@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
		@InjectModel(Comment.name) private commentModel: Model<TrackDocument>,
		private fileService: FileService
	) {}

	async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
		const audioPath = await this.fileService.create(FileType.AUDIO, audio)
		const picturePath = await this.fileService.create(FileType.IMAGE, picture)
		const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
		return track
	}

	async getAll(): Promise<Track[]> {
		const tracks = await this.trackModel.find().populate('comments')
		return tracks
	}

	async getOne(id: ObjectId): Promise<Track> {
		const track = await this.trackModel.findById(id).populate('comments')
		return track
	}

	async delete(id: ObjectId): Promise<ObjectId> {
		const track = await this.trackModel.findByIdAndDelete(id)
		return track._id
	}

	async addComment(dto: CreateCommentDto): Promise<Comment> {
		const track = await this.trackModel.findById(dto.trackId)
		const comment = await this.commentModel.create({...dto})
		track.comments.push(comment._id)
		await track.save()
		// @ts-ignore
		return comment
	}
}
