import { Controller, Post, Body, Get, Patch, Query, Param, Delete, 
UseInterceptors, ClassSerializerInterceptor, Session } from '@nestjs/common'; 
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { SerializeInterceptor, Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';


@Controller('auth')
@Serialize(UserDto)
export class UsersController {
   constructor(private userService:UsersService, private authService:AuthService){}

@Get('/colors/:color')
setColor(@Param('color') color:string, @Session() session:any){
   session.color = color;
}

@Get('/colors')
getColors(@Session() session:any){
   return session.color;
}

@Post('/signout')
signOut(@Session() session:any){
   session.userId = null;
}

 @Post('/signup')
 async createUser(@Body() body: CreateUserDto, @Session() session:any){
   //  this.userService.create(body.email, body.password)
    const user = await this.authService.signup(body.email, body.password)
   session.userId = user.id;
   return user;
   }

   @Get('/whoami')
   whoAmI(@Session() session:any){
      return this.userService.findOne(session.userId)
   }

 @Post('/signin')
 async signin(@Body() body:CreateUserDto, @Session() session:any){
    const user = await this.authService.signin(body.email, body.password)
   session.userId = user.id;
   return user;
   }

//@UseInterceptors(new SerializeInterceptor(UserDto))
// @Serialize(UserDto)
 @Get('/:id')
 findUSer(@Param('id') id:string){
   return this.userService.findOne(parseInt(id))
 }

 @Get()
 findAllUSer(@Query('email') email:string){
   return this.userService.find(email)
 }

 @Delete('/:id')
removeUser(@Param('id') id:string){
   this.userService.remove(parseInt(id))
}

@Patch('/:id')
updateUser(@Param('id') id:string, @Body() body:UpdateUserDto){

   return this.userService.update(parseInt(id), body)
}


}
