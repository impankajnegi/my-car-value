import { Controller, Post, Body, Get, Patch, Query, Param, Delete, 
UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'; 
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

 @Post('/signup')
 createUser(@Body() body: CreateUserDto){
   //  this.userService.create(body.email, body.password)
   return this.authService.signup(body.email, body.password)

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
