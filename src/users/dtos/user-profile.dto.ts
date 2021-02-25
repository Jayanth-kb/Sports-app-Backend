import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Mutationoutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Number)
  userId: number;
}

@ObjectType()
export class UserProfileOutput extends Mutationoutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
