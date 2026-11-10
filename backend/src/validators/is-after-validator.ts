import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments
} from 'class-validator';

export function IsAfter(
    property: string,
    validationOptions?: ValidationOptions
) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isAfter',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: Date, args: ValidationArguments) {
                    const [relatedProperty] = args.constraints;
                    const relatedValue = (args.object as any)[relatedProperty];

                    return value instanceof Date &&
                        relatedValue instanceof Date &&
                        value.getTime() > relatedValue.getTime();
                }
            }
        });
    };
}