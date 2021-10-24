import { BadRequestException, Injectable } from "@nestjs/common"; 
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify} from 'util'
import { runInThisContext } from "vm";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService{
    constructor(private userService:UsersService){}

    async signup(email:string, password:string){
        //See if email is in use
        const users = await  this.userService.find(email)
        if(users.length){
            throw new BadRequestException('Email in use')
        }
        //Hash user's password
        //1. Generate a salt
        const salt = randomBytes(8).toString('hex');
        //2. Hash the salt and password together
        const hash =( await scrypt(password, salt, 32)) as Buffer
        //3. Join the hash result and salt together
        const result = salt+"."+hash.toString('hex');
        //Create a new user and sane it
        const user = await this.userService.create(email, result)
        //Return the user
        return user;
    }
    
    signin(){

    }
}