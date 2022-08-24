import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { TrackModule } from '@app/track/track.module'
import { FileModule } from '@app/file/file.module'

@Module({
	imports: [
		MongooseModule.forRoot('mongodb+srv://itsaln:WxvDPn1011@cluster0.hgr0sbm.mongodb.net/music-platform?retryWrites=true&w=majority'),
		TrackModule,
		FileModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
