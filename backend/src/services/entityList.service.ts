import { InjectRepository } from '@nestjs/typeorm';
import { EntityList } from './../schema/entityList.schema';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';

@Injectable()
export class EntityListService{
    constructor(
        @InjectRepository(EntityList)
        private readonly entityListRepository: Repository<EntityList>
        
    ){}

    async addEntity(data : any):Promise<EntityList[]>{
       const entity =  this.entityListRepository.create(data);
       return await this.entityListRepository.save(entity);
    }

    async getAllEntity():Promise<EntityList[]>{
        return await this.entityListRepository.find();
    }


}