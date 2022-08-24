import { Module } from '@nestjs/common'
import { FileService } from '@app/file/file.service'

@Module({
	providers: [FileService]
})
export class FileModule {}
