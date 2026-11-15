import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate{
	constructor(private reflector: Reflector) {}
	

	canActivate(context:ExecutionContext){
		context.getHandler();
		context.getClass();
	}

	if(!requiredRoles){
		return true;
	}
	const { user } = context.switchToHttp().getRequest();

	return requiredRoles.some((role) => user?.roles?.includes(role));

}