import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
dotenv.config();

export const typeOrmConfig = (configService: ConfigService) : TypeOrmModuleOptions => ({
// export const typeOrmConfig = (configService: ConfigService) : TypeOrmModuleOptions => ({    
    type: 'postgres',
    // type: 'mongodb',
    // url: configService.get('DATABASE_MONGO'),
    // url: process.env.DATABASE_MONGO,
    // url: 'postgres://nodejs:nodejs@34.67.110.29:5432/postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password:  configService.get('DATABASE_PASS'),
    database: configService.get('DATABASE_NAME'),
    ssl: true,
    extra: {
        ssl: {
          rejectUnauthorized: false
        },
    },
    // logging: true,
    // synchronize: true,
    entities: [join(__dirname + '../../**/*.entity.{js,ts}')],
    synchronize: true
})
