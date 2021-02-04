import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";


type userrole='player'|'trainer'|'countManager';
@Entity()
export class User extends CoreEntity
{
    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    role:userrole;
}