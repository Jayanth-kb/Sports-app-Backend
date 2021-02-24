import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createCountDto } from "./dtos/create-restaurant.dto";
import { Count } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantService{
    constructor(@InjectRepository(Count)
    private readonly Counts:Repository<Count>){
         
    }
    getALL():Promise<Count[]> {
        return this.Counts.find(); 
    }
    createCounts (createCountDto:createCountDto): Promise<Count> {
        const newCount = this.Counts.create(createCountDto);
        return this.Counts.save(newCount);
    }
}