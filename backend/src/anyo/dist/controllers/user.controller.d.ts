import { UserRepository } from '../repositories';
import { Response } from 'got';
export declare class UserController {
    userRepository: UserRepository;
    private response;
    constructor(userRepository: UserRepository, response: Response);
    getVideo(): Promise<void>;
}
