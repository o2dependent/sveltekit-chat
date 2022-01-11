import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterCredentialsDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@MaxLength(32)
	password: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@MaxLength(32)
	confirmPassword: string;
}
