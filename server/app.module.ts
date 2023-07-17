import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmPositionEntity } from './_entities/cm-position.entity';
import { Client } from '@googlemaps/google-maps-services-js';
import { ConfigModule } from '@nestjs/config';
import { GoogleMapsClientSybmol } from './_entities/_constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      entities: [CmPositionEntity],
      synchronize: true,
      type: 'mysql',
      host: 'cm-map-db.ctfi3r8beed9.ap-northeast-1.rds.amazonaws.com',
      username: 'admin',
      password: 'kk2k1729',
      database: 'dev',
    }),
    TypeOrmModule.forFeature([CmPositionEntity]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: GoogleMapsClientSybmol, useValue: new Client() },
  ],
})
export class AppModule {}
