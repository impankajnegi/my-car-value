import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './report/report.entity';
import { ReportModule } from './report/report.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database: 'db.sqlite',
    entities:[User, Report],
    synchronize:true
  }), ReportModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
