import { Module } from '@nestjs/common'
import { TrackController } from '@app/track/track.controller'
import { TrackService } from '@app/track/track.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Track, TrackSchema } from '@app/track/schemas/track.schema'
import { Comment, CommentSchema } from '@app/track/schemas/comment.schema'
import { FileService } from '@app/file/file.service'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
    MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService]
})
export class TrackModule {}
