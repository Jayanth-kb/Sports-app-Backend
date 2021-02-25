import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  createAccountinput,
  createAccountoutput,
} from './dtos/create-account.dto';
import { loginInput, loginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation((returns) => createAccountoutput)
  async createAccount(
    @Args('input') createAccountinput: createAccountinput,
  ): Promise<createAccountoutput> {
    try {
      return this.userService.createAccount(createAccountinput);
    } catch (error) {
      return { error, ok: false };
    }
  }

  @Mutation((returns) => loginOutput)
  async login(@Args('input') loginInput: loginInput): Promise<loginOutput> {
    try {
      return this.userService.login(loginInput);
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authuser: User) {
    return authuser;
  }

  @UseGuards(AuthGuard)
  @Query((returns) => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    try {
      const user = await this.userService.findById(userProfileInput.userId);
      if (!user) {
        throw Error();
      }
      return {
        ok: true,
        user,
      };
    } catch (e) {
      return { error: 'User Not Found', ok: false };
    }
  }
}
