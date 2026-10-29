import { Module } from '@nestjs/common';
import { User} from './users.entity';
@Module({
   imports:[TypeOrmModule.forfeature([User])],
})
export class UsersModule {}
