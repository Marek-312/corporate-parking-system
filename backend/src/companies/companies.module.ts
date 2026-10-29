import { Module } from '@nestjs/common';
import { Company } from './company.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Company])],
})
export class CompaniesModule {}