/* eslint-disable prettier/prettier */
export class BusinessLogicException extends Error {
    type: number;
    constructor(message: string, type: number) {
        super(message);
        this.name = "BusinessLogicException";
        this.type = type;
    }
}
   
export enum BusinessError {
    NOT_FOUND,
    PRECONDITION_FAILED,
    BAD_REQUEST
}
  