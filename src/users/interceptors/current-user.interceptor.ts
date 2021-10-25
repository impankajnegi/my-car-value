import{
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUsseInterceptor implements NestInterceptor{
   constructor(private userService:UsersService){}
    async intercept(context:ExecutionContext, handler:CallHandler){
        const request = context.switchToHttp().getRequest()
        // const {userId} = request.session;
        const { userId } = request.session || {};
        console.log(userId)
        if(!userId){
            return handler.handle()
        }
        const user = await this.userService.findOne(userId)
        request.currentUser = user;
        return handler.handle()

    }
}