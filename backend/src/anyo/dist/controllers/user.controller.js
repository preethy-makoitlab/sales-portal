"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const got_1 = tslib_1.__importDefault(require("got"));
const core_1 = require("@loopback/core");
let UserController = class UserController {
    constructor(userRepository, response) {
        this.userRepository = userRepository;
        this.response = response;
    }
    async getVideo() {
        var fileUrl = 'https://ia800300.us.archive.org/1/items/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4';
        got_1.default.stream(fileUrl, (stream) => {
            // this.response(stream);
            console.log(stream);
        });
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/videos'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getVideo", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository, Object])
], UserController);
exports.UserController = UserController;
//   @post('/users')
//   @response(200, {
//     description: 'User model instance',
//     content: {'application/json': {schema: getModelSchemaRef(User)}},
//   })
//   async create(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(User, {
//             title: 'NewUser',
//           }),
//         },
//       },
//     })
//     user: User,
//   ): Promise<User> {
//     return this.userRepository.create(user);
//   }
//   @get('/users/count')
//   @response(200, {
//     description: 'User model count',
//     content: {'application/json': {schema: CountSchema}},
//   })
//   async count(
//     @param.where(User) where?: Where<User>,
//   ): Promise<Count> {
//     return this.userRepository.count(where);
//   }
//   @get('/users/list')
//   @response(200, {
//     description: 'Array of User model instances',
//     content: {
//       'application/json': {
//         schema: {
//           type: 'array',
//           items: getModelSchemaRef(User, {includeRelations: true}),
//         },
//       },
//     },
//   })
//   async find(
//     @param.filter(User) filter?: Filter<User>,
//   ): Promise<User[]> {
//     return this.userRepository.find(filter);
//   }
//   // @patch('/users')
//   // @response(200, {
//   //   description: 'User PATCH success count',
//   //   content: {'application/json': {schema: CountSchema}},
//   // })
//   async updateAll(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(User, {partial: true}),
//         },
//       },
//     })
//     user: User,
//     @param.where(User) where?: Where<User>,
//   ): Promise<Count> {
//     return this.userRepository.updateAll(user, where);
//   }
//   @get('/users/getById/{id}')
//   @response(200, {
//     description: 'User model instance',
//     content: {
//       'application/json': {
//         schema: getModelSchemaRef(User, {includeRelations: true}),
//       },
//     },
//   })
//   async findById(
//     @param.path.string('id') id: string,
//     @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
//   ): Promise<User> {
//     return this.userRepository.findById(id, filter);
//   }
//   // @patch('/users/{id}')
//   // @response(204, {
//   //   description: 'User PATCH success',
//   // })
//   // async updateById(
//   //   @param.path.string('id') id: string,
//   //   @requestBody({
//   //     content: {
//   //       'application/json': {
//   //         schema: getModelSchemaRef(User, {partial: true}),
//   //       },
//   //     },
//   //   })
//   //   user: User,
//   // ): Promise<void> {
//   //   await this.userRepository.updateById(id, user);
//   // }
//   @put('/users/update/{id}')
//   @response(204, {
//     description: 'User PUT success',
//   })
//   async replaceById(
//     @param.path.string('id') id: string,
//     @requestBody() user: User,
//   ): Promise<void> {
//     await this.userRepository.replaceById(id, user);
//   }
//   @del('/users/delete/{id}')
//   @response(204, {
//     description: 'User DELETE success',
//   })
//   async deleteById(@param.path.string('id') id: string): Promise<void> {
//     await this.userRepository.deleteById(id);
//   }
// }
//# sourceMappingURL=user.controller.js.map