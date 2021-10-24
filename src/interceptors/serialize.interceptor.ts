import{
UseInterceptors,
NestInterceptor,
ExecutionContext,
CallHandler
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer'; 
interface ClassConstructor{
    new (...args: any[]): {}
}

export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context:ExecutionContext, handler:CallHandler): Observable<any>{
        //Run Somethinf before a request is handleed
        //by the request handler
        console.log('im running before the handler', context);
        
        return handler.handle().pipe(
            map((data:any)=>{
                //Run somethiing before the rsponse is sent out
                 console.log('Im running before respons eis sent out', data)
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues:true
                })
            })
        )
    }
}