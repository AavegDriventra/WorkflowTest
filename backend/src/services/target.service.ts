import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { Target } from 'src/schema/target.schema';

@Injectable()
export class TargetService{
    constructor(
        @InjectRepository(Target)
        private readonly targetRepository: Repository<Target>
        
    ){}

    async addTarget(data : any):Promise<Target[]>{
       const targetData =  this.targetRepository.create(data);
       return await this.targetRepository.save(targetData);
    }

    async getAllTarget():Promise<Target[]>{
        // await this.targetRepository.delete({});
        // await this.targetRepository.query('ALTER TABLE target AUTO_INCREMENT = 1');

        return await this.targetRepository.find();
    }

    async getTargetEntityId(workflow_target_entity_id: number): Promise<Target[]> {
        return await this.targetRepository.find({ where: { workflow_target_entity_id } });
    }
    


}